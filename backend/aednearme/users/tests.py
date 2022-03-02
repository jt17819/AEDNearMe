from django.test import TestCase, Client, SimpleTestCase
from django.urls import reverse, resolve
from users.views import RegisterView, LogoutView, get_by_username
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
import json


class TestViewsCase(TestCase):
    c = Client()

    # def setUp(self):
    #     self.credentials = {
    #         "username": "test",
    #         "first_name": "test",
    #         "last_name": "test",
    #         "email": "test@gmail.com",
    #         "password": "test",
    #     }
    #     User.objects.create_user(**self.credentials)
    
    def test_register(self):
        user_details = {
            'username': 'test',
            'password':'test',
            'email': 'test@test.com',
            'first_name': 'test',
            'last_name': 'case'
        }
        response = self.c.post(reverse('register'), user_details)
        self.assertEqual(response.status_code, 201)
    
    def test_login(self):
        user_details = {
            'username': 'test',
            'password':'test',
            'email': 'test@test.com',
            'first_name': 'test',
            'last_name': 'case'
        }
        self.c.post(reverse('register'), user_details)

        response = self.c.post(reverse('token_obtain_pair'), {'username': 'test', 'password': 'test' })
        print(response)
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        user_details = {
            'username': 'test',
            'password':'test',
            'email': 'test@test.com',
            'first_name': 'test',
            'last_name': 'case'
        }
        self.c.post(reverse('register'), user_details)

        response = self.c.post(reverse('token_obtain_pair'), {'username': 'test', 'password': 'test' })
        hold = response.content.decode('UTF-8')
        token = json.loads(hold)['token']
        print(token)
        response = self.c.post(
            reverse('logout'),
            **{'Authorization': f'Token {token}'}
        )
        self.assertEqual(response.status_code, 200)

    # def test_login(self):
    #     response = self.client.post(
    #         "/user/login", {"email": "test@gmail.com", "password": "test"}
    #     )
    #     hold = response.content.decode("UTF-8")
    #     token = json.loads(hold)
    #     response = self.client.post(
    #         reverse("logout"), **{"Authorization": f"Token {token}"}
    #     )
    #     self.assertEqual(response.status_code, 200)



class TestViews(TestCase):
    def test_get_by_username_view(self):
        c = Client()
        response = c.get(reverse('get_by_username'))
        self.assertEquals(response.status_code, 200)



class TestUrls(SimpleTestCase):   

    def test_register_url(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func.view_class, RegisterView)
    
    def test_get_by_username_url(self):
        url = reverse('get_by_username')
        self.assertEquals(resolve(url).func, get_by_username)

    def test_login_url(self):
        url = reverse('token_obtain_pair')
        self.assertEquals(resolve(url).func.view_class, TokenObtainPairView)

    def test_login_refresh_url(self):
        url = reverse('token_refresh')
        self.assertEquals(resolve(url).func.view_class, TokenRefreshView)

    def test_logout_url(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func.view_class, LogoutView)