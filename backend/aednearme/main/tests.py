from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.test import Client, TestCase, SimpleTestCase
from django.urls import reverse, resolve
from .views import get_all_defibs, create_defib
import datetime

from .models import Defib


# Create your tests here.
class BaseTestCase(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username='myusername',
            first_name="sdfgh",
            last_name="jhgfds",
            email='myemail@crazymail.com',
            password='mypassword123'
        )
        cls.user.save()

        cls.defib = Defib.objects.create(
            address='123 Fenchurch Street',
            post_code='SW194TG',
            long='0.1276',
            lat='51.5072',
            what3words_link='http://www.google.com',
            photo_url='sdfghj',
            access='public',
            approved=True,
            comments='asdfghjhgfdfghnb',
            # user_id='myusername'
        )
        


# class TestBasicViews(BaseTestCase):
#     c = Client()

#     def test_home(self):
#         response = self.c.get(reverse('adoption-home'))
#         assert "doggos" in response.context
#         assert response.context['doggos'].count() == 1
#         assert "adoption/home.html" in [t.name for t in response.templates]

#     def test_about(self):
#         response = self.c.get(reverse('adoption-about'))
#         assert "adoption/about.html" in [t.name for t in response.templates]

#     def test_create(self):
#         response = self.c.get('dog-create')
#         assert "adoption/404.html" in [t.name for t in response.templates]

#     def test_show(self):
#         response = self.c.get('dog-show')
#         assert "adoption/404.html" in [t.name for t in response.templates]

class TestUrls(SimpleTestCase):   

    def test_aed_url(self):
        url = reverse('get_all_defibs')
        self.assertEquals(resolve(url).func, get_all_defibs)



class TestLoggedInViews(LoginRequiredMixin, BaseTestCase):

    def setUp(self):
        self.c = Client()
        self.c.login(username="myusername", password="mypassword123")

        test_user1 = User.objects.create_user(
            username='testuser1',
            first_name='john',
            last_name='doe',
            email='johndoe@test.com',
            password='1X<ISRUkw+tuK'
            )
        test_user1.save()
    
    def test_redirect_if_not_logged_in(self):
        response = self.client.get(reverse('create_defib'))
        self.assertRedirects(response, '/users/login/')

    def test_create_defib(self):
        # user_details = {
        #     'username': 'test',
        #     'password':'123abc543',
        #     'email': 'test@test.com',
        #     'first_name': 'test',
        #     'last_name': 'case'
        # }
        # response = self.c.post(reverse('register'), user_details)
        # response = self.c.post(reverse('token_obtain_pair'), {'username': 'test', 'password': '123abc543' })
        # print(response)
        # # self.assertEqual(response.status_code, 200)

        self.c = Client()
        self.c.login(username="testuser1", password="1X<ISRUkw+tuK")
        
        now = datetime.datetime.now()
        initial_defib_count = Defib.objects.count()
        response = self.c.post(reverse('create_defib'), {
            'address': '76 Wellies Street',
            'post_code': 'TR3567',
            'lat': '51.509865',
            'long': '-0.118092',
            'what3words_link': 'http://google.com',
            'photo_url': '',
            'time_taken': now,
            'access': 'public',
            'approved': True,
            'username': 'myusername',
            'comments': 'jytrdcvbhu7654'
        })
        # assert Defib.objects.filter(latitude='51.509865').exists()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Defib.objects.count(), initial_defib_count + 1)
    
    # def test_create_defib(self):
    #     now = datetime.datetime.now()
    #     response = self.c.post(reverse('aed/upload/'), { 'access': 'public' })
    #     self.assertEqual(response.status_code, 200)
    
    def test_create_defib_url(self):
        url = reverse('create_defib')
        self.assertEquals(resolve(url).func, get_all_defibs)
    

class TestModels(TestCase):
  def test_defib(self):
    Defib.objects.create(
      address='123 Fenchurch Street',
      post_code='SW194TG',
      long='0.1276',
      lat='51.5072',
      what3words_link='http://google.com',
      photo_url='',
      access='',
      approved=True,
      comments='',
    #   user_id=''

    )
    self.assertEqual(Defib.objects.count(), 1)
    Defib.objects.create(
      address='64 Zoo Lane',
      post_code='SE237SX',
      long='0.1226',
      lat='51.5012',
      what3words_link='http://google.com',
      photo_url='',
      access='',
      approved=True,
      comments='',
    #   user_id=''
    )
    self.assertEqual(Defib.objects.count(), 2)
