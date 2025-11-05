# Google Form Registration Form Setup Guide
## Study: On-Task Objective method of cognitive load assessment
## Principal Investigator: Tam Vu

This guide shows you how to create a **single-page registration form** where participants can scroll through all fields and submit at the bottom, without clicking "Next" buttons between sections.

---

## IMPORTANT: SETTING UP SINGLE-PAGE FORM

### Key Point: Use Sections for Organization, But Disable Page Breaks

In Google Forms:
- **Sections WITH page breaks** = participants click "Next" (what you saw in consent form)
- **Sections WITHOUT page breaks** = all on one page, just scroll (what we want here)
- **No sections** = all questions on one page (also works, but less organized)

**We'll use sections for organization but disable the page breaks.**

---

## GOOGLE FORM SETUP

### Step 1: Create New Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Click "+" to create a new form
3. Title: "Registration Form - On-Task Objective method of cognitive load assessment"
4. Description: "Participant Registration for Research Study"

### Step 2: Configure Form Settings (Important!)
1. Click the **Settings** icon (gear icon, top right)
2. **Presentation** tab:
   - ✅ Check "Show progress bar" (helps participants see they're near the end)
   - ❌ Do NOT check "Shuffle question order"
3. Click outside the settings to close

---

## FORM STRUCTURE (ALL ON ONE PAGE)

### HOW TO DISABLE PAGE BREAKS IN SECTIONS:

When you add a "Section" field in Google Forms:
1. Click the section divider icon in the toolbar
2. A section will appear
3. **IMPORTANT:** Click on the section you just added
4. Look for a toggle/checkbox that says "Continue to next section" or similar
5. **UNCHECK it** - this removes the page break
6. Now all sections will flow on the same page

**Alternative Method:**
- If you can't find the toggle, just add all questions WITHOUT using section dividers
- Use regular question fields with descriptive text
- Everything will appear on one continuous page

---

## FORM FIELDS (In Order)

### FIELD 1: Full Name
**Field Type:** Short answer text (Required)

**Question:**
```
Full Name *
```

**Settings:**
- ✅ Required
- Validation: Text length (minimum 2 characters)

---

### FIELD 2: Email Address
**Field Type:** Short answer text (Required)

**Question:**
```
Email Address *
```

**Settings:**
- ✅ Required
- Validation: Email address format

**Help Text (Optional):**
```
We will use this email to contact you about scheduling your study session.
```

---

### FIELD 3: Phone Number
**Field Type:** Short answer text (Optional but Recommended)

**Question:**
```
Phone Number (Optional)
```

**Settings:**
- ❌ Not Required
- Validation: Text length (optional)

**Help Text (Optional):**
```
Include area code. We may use this to contact you about scheduling.
```

---

### FIELD 4: Preferred Contact Method
**Field Type:** Multiple choice (Required)

**Question:**
```
Preferred Contact Method *
```

**Options:**
- Email
- Phone call
- Text message
- No preference

**Settings:**
- ✅ Required
- ✅ Only allow one response per option

---

### FIELD 5: Availability - Days of Week
**Field Type:** Checkbox (Required)

**Question:**
```
Which days of the week are you typically available for a 90-100 minute study session? *
```

**Options:**
- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

**Settings:**
- ✅ Required
- ✅ Allow multiple selections

**Help Text (Optional):**
```
Select all days that work for you. We will contact you to schedule a specific time.
```

---

### FIELD 6: Availability - Time Preferences
**Field Type:** Multiple choice (Required)

**Question:**
```
What time of day do you prefer for the study session? *
```

**Options:**
- Morning (9:00 AM - 12:00 PM)
- Afternoon (12:00 PM - 5:00 PM)
- Evening (5:00 PM - 8:00 PM)
- Flexible / Any time

**Settings:**
- ✅ Required
- ✅ Only allow one response per option

---

### FIELD 7: Study Session Preference
**Field Type:** Multiple choice (Required)

**Question:**
```
How would you like to schedule your study session? *
```

**Options:**
- First available slot
- I have specific date/time preferences (we'll contact you)
- Flexible - I can work around your schedule
- I'd like to discuss options

**Settings:**
- ✅ Required
- ✅ Only allow one response per option

**Help Text (Optional):**
```
If you selected "I have specific date/time preferences", please provide details in the comments section below.
```

---

### FIELD 8: Confirmation - Consent Form Completed
**Field Type:** Checkbox (Required)

**Question:**
```
Before proceeding, please confirm: *
```

**Options:**
- [ ] I have reviewed and completed the consent form

**Settings:**
- ✅ Required
- ✅ Only allow one response per option

**Help Text:**
```
You must have completed the consent form before registering for this study. If you haven't yet, please return to the study website and click "Review Consent Form" first.
```

---

### FIELD 9: Confirmation - Study Requirements
**Field Type:** Checkbox (Required)

**Question:**
```
Please confirm your understanding: *
```

**Options:**
- [ ] I understand that this study session will take approximately 90-100 minutes
- [ ] I understand that I will need to wear a FRENZ headband during the study
- [ ] I am available for a single visit of 90-100 minutes

**Settings:**
- ✅ Required
- ✅ Allow multiple selections (all three should be checked)

---

### FIELD 10: Additional Comments (Optional)
**Field Type:** Long answer text (Optional)

**Question:**
```
Additional Comments or Questions (Optional)
```

**Settings:**
- ❌ Not Required

**Help Text (Optional):**
```
If you have specific scheduling preferences, questions, or anything else you'd like us to know, please provide that information here.
```

---

## FORM SETTINGS CHECKLIST

### General Settings:
- [ ] Collect email addresses: OFF (we're asking for email in the form)
- [ ] Limit to 1 response: OFF (allow new submissions)
- [ ] Edit after submit: OFF (registration should be final)
- [ ] Show progress bar: ON
- [ ] Confirmation message: Customize (see below)

### Response Settings:
- [ ] Save responses to Google Sheets: ON
- [ ] Email notifications: ON (receive email when someone registers)

### Confirmation Message:
```
Thank you for registering to participate in our study!

We have received your registration and will contact you at your preferred contact method (EMAIL/PHONE) within the next few business days to schedule your study session.

If you have any questions in the meantime, please contact:
Tam.N.Vu@dartmouth.edu

Study Details:
- Duration: 90-100 minutes
- Location: [Add your study location]
- Compensation: Amazon gift card upon completion

We look forward to working with you!
```

---

## TIPS FOR SINGLE-PAGE FORM

### Method 1: No Section Breaks (Simplest)
- Just add all questions one after another
- Don't add any "Section" dividers
- Everything will flow on one page automatically

### Method 2: Sections Without Page Breaks
- Add sections for visual organization
- But disable page breaks in each section
- Look for "Continue to next section" toggle and uncheck it

### Method 3: Use Descriptions as Headers
- Instead of sections, use "Short answer" fields with question text
- Set them as "Description only" or use them as headers
- Group related questions together

---

## TESTING CHECKLIST

Before making the form live:

- [ ] All fields display on one page (no "Next" buttons)
- [ ] Required fields are marked with asterisk (*)
- [ ] Email field validates email format
- [ ] Checkboxes allow multiple selections where needed
- [ ] Multiple choice fields only allow one selection
- [ ] Form cannot be submitted without required fields
- [ ] Confirmation message displays correctly
- [ ] Responses are being saved to Google Sheets
- [ ] Email notifications are working
- [ ] Test on mobile device to ensure it's readable
- [ ] Test the link from your website

---

## GETTING THE FORM LINK

1. Click the vertical ellipsis (three dots) button (top right)
2. Click "Copy responder link"
3. Copy the full URL
4. Extract the form ID (the part between `/d/e/` and `/viewform`)
   - Example: `https://docs.google.com/forms/d/e/1ABC123xyz/viewform`
   - Form ID: `1ABC123xyz`
5. Replace `GOOGLE_FORM_LINK` in your `index.html` with this form ID

---

## LINKING CONSENT AND REGISTRATION

### Recommended Flow:
1. Participant visits website
2. Reads study information
3. Clicks "Review Consent Form" → Completes consent form
4. Returns to website
5. Clicks "Register for the Study" → Completes registration
6. Both forms are linked via email address (if you collect it in both)

### Optional: Add Link Between Forms
- In registration form, you could add a question: "Have you completed the consent form?"
- Or add a link back to consent form in the registration form description

---

## SECURITY RECOMMENDATIONS

1. **Google Sheets Access:**
   - Restrict access to authorized study personnel only
   - Use Google Workspace (Dartmouth account) if possible
   - Enable two-factor authentication

2. **Data Management:**
   - Export responses periodically to secure Dartmouth systems
   - Follow IRB data retention requirements
   - Ensure compliance with privacy regulations

3. **Form Sharing:**
   - Only share form link, not edit access
   - Monitor responses regularly
   - Set up email notifications for new registrations

---

## EXAMPLE FORM STRUCTURE VISUAL

```
┌─────────────────────────────────────┐
│ Registration Form - Title           │
│ Description                         │
├─────────────────────────────────────┤
│ Full Name *                         │
│ [Text input]                        │
├─────────────────────────────────────┤
│ Email Address *                     │
│ [Text input]                        │
├─────────────────────────────────────┤
│ Phone Number                        │
│ [Text input]                        │
├─────────────────────────────────────┤
│ Preferred Contact Method *           │
│ ( ) Email                           │
│ ( ) Phone                           │
│ ( ) Text                            │
├─────────────────────────────────────┤
│ Availability - Days *               │
│ [ ] Monday  [ ] Tuesday  etc.       │
├─────────────────────────────────────┤
│ Time Preferences *                  │
│ ( ) Morning                         │
│ ( ) Afternoon                       │
│ ( ) Evening                         │
├─────────────────────────────────────┤
│ Study Session Preference *          │
│ ( ) First available                 │
│ ( ) Specific preferences            │
├─────────────────────────────────────┤
│ Confirmation - Consent *            │
│ [ ] I completed consent form        │
├─────────────────────────────────────┤
│ Confirmation - Requirements *       │
│ [ ] I understand duration           │
│ [ ] I understand headband           │
│ [ ] I am available                  │
├─────────────────────────────────────┤
│ Additional Comments                 │
│ [Long text input]                   │
├─────────────────────────────────────┤
│ [Submit Button]                     │
└─────────────────────────────────────┘
```

All on one page - participants scroll down and submit!

---

**End of Setup Guide**

