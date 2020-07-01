# Recaptcha Demo
Test your V2 (one click), V3 (score), and invisible (one click) captcha.
Demo site: https://captcha.vispo.dev/

# Install
This project uses (node)[https://nodejs.org/en/] and (npm)[https://www.npmjs.com/].
```
npm i
```

# Setup
You must supply your own reCAPTCHA keys for this project. Visit Google's [reCAPTCHA admin panel](https://www.google.com/recaptcha/admin/create) and create 3 keys:
1. reCAPTCHA v2 Checkbox
2. reCAPTCHA v2 Invisible
3. reCAPTCHA v3

Navigate to [index.html](index.html) and replace placeholders with your own keys:
1. Replace **YOUR_V3_KEY** with your **reCAPTCHA v3** key
2. Replace **YOUR_INVISIBLE_KEY** with your **reCAPTCHA v2 Invisible** key
3. Replace **v2Key** with your **reCAPTCHA v2 Checkbox** key
4. Replace **v3Key** with your **reCAPTCHA v3** key
5. Replace **invisibleKey** with your **reCAPTCHA v2 Invisible** key

Navigate to [.env](.env) and replace placeholders with your own keys:
1. Replace **RECAPTCHAV3_SECRET** with your **reCAPTCHA v3** secret key

# Deploy
```
npm start
```
Live site: http://localhost