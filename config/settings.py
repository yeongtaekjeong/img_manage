import os
import platform
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = 'true'

SESSION_SAVE_EVERY_REQUEST = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = None
SESSION_COOKIE_SAMESITE = 'strict'
SESSION_COOKIE_SECURE = False

CSRF_COOKIE_AGE = None
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'strict'
CSRF_COOKIE_SECURE = False

SECRET_KEY = 't9##!z_t-)s^a&bf507vzspga8n9k$w5!-yl1=h(-psr%azxzt'

ALLOWED_HOSTS = ['*']
APPEND_SLASH = True

# 서버
if platform.system() == 'Linux':
    DEBUG = False
    CUSTOM_BASE_DIR = '/ki/'
    MOUNT_DIR = '/mnt'
# 로컬
if platform.system() == 'Windows':
    DEBUG = True
    CUSTOM_BASE_DIR = 'D:/KI/'
    MOUNT_DIR = 'D:/mnt'

# Application definition
INSTALLED_APPS = [
    'kaid.apps.KaidConfig',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'django.contrib.humanize',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': '',
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ko-KR'
TIME_ZONE = 'Asia/Seoul'
USE_I18N = True
USE_L10N = True
USE_TZ = False

STATIC_ROOT = ''
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = (BASE_DIR, 'static')