# EmailJS Setup Guide

This guide will help you set up EmailJS to receive email notifications when someone submits the contact form.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. **Note down your Service ID** (e.g., `service_xxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Use the following template settings:

**Template Name:** Contact Form Notification

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
You have received a new contact form submission:

From: {{from_name}}
Email: {{from_email}}
Reply To: {{reply_to}}

Message:
{{message}}

---
This message was sent from your Kahon Studio Portfolio website.
```

4. **Important:** Make sure to include these template variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{reply_to}}`
   - `{{message}}`
   - `{{to_email}}` (this will be set automatically to itsmeibay@gmail.com)

5. Click **Save**
6. **Note down your Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. **Note down your Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Add Environment Variables

Add these variables to your `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## Step 6: Restart Your Development Server

After adding the environment variables, restart your dev server:

```bash
npm run dev
```

## Testing

1. Submit a test message through your contact form
2. Check your email inbox (itsmeibay@gmail.com)
3. You should receive an email notification with the form details

## Troubleshooting

- **Emails not sending?** Check the browser console for errors
- **Template variables not working?** Make sure you've added all the required variables in your EmailJS template
- **Service ID/Template ID not found?** Double-check that you've copied the correct IDs from the EmailJS dashboard
- **Rate limiting?** Free tier allows 200 emails/month. Upgrade if you need more.

## Security Note

The EmailJS Public Key is safe to use in frontend code - it's designed to be public. However, make sure your `.env` file is in `.gitignore` (which it already is) to prevent committing sensitive information.


