# Generated by Django 4.0.2 on 2022-02-25 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_defib_photo_url_alter_defib_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='defib',
            name='photo_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
