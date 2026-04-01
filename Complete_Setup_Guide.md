# Complete Setup Guide: Google Sheets + Apps Script Automation

This guide covers everything you need to set up automated email sending for your registration form.

---

## PART 1: LINKING FORMS TO GOOGLE SHEETS

### Step 1: Link Consent Form to Sheets

1. Open your **Consent Form** in Google Forms
2. Click the **"Responses"** tab
3. Click the green **"Link to Sheets"** button
4. Choose **"Create a new spreadsheet"**
5. Name it something like: `Consent Form Responses`
6. Click **"Create"**

**Result:** All consent form submissions will be saved in this Google Sheet.

---

### Step 2: Link Registration Form to Sheets

1. Open your **Registration Form** in Google Forms
2. Click the **"Responses"** tab
3. Click the green **"Link to Sheets"** button
4. Choose **"Create a new spreadsheet"**
5. Name it something like: `Registration Form Responses`
6. Click **"Create"**

**Result:** All registration form submissions will be saved in this Google Sheet.

**This is where you'll add the Apps Script!**

---

## PART 2: FINDING YOUR COLUMN NAMES

### Why This Matters:
The Apps Script needs to know the exact names of your columns to read the data correctly.

### How to Find Column Names:

1. Open your **Registration Form Responses** Google Sheet
2. Look at **Row 1** - these are your column headers
3. Write down the exact names (they're case-sensitive!)

**Example column headers you might see:**
- `Timestamp`
- `Email`
- `Full Name`
- `Dartmouth NetID`
- `Availability - Slot Preferences (Ranked) - First Preferred Time Slot`
- `Availability - Slot Preferences (Ranked) - Second Preferred Time Slot`
- `Availability - Slot Preferences (Ranked) - Third Preferred Time Slot`

### Important:
- Copy the column names **exactly** as they appear
- Include any spaces, punctuation, or special characters
- Column names are case-sensitive

---

## PART 3: SETTING UP APPS SCRIPT

### Step 1: Open Apps Script

1. Open your **Registration Form Responses** Google Sheet
2. Go to **Extensions** → **Apps Script**
3. A new tab opens with the script editor

### Step 2: Paste the Code

1. Delete any default code in the editor
2. Open the file: `Apps_Script_Automated_Email_System.gs`
3. Copy **ALL** the code
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) or press `Cmd+S`
6. Name your project: "Registration Email Automation"

### Step 3: Update Column Names

1. In the Apps Script editor, find the **CONFIGURATION** section (around line 30)
2. Look at the `COLUMNS` object
3. **Compare with your actual Google Sheet column headers**
4. Update any column names that don't match exactly

**Example:**
```javascript
const COLUMNS = {
  TIMESTAMP: 'Timestamp',  // ✅ Match this to your sheet
  EMAIL: 'Email',          // ✅ Match this to your sheet
  NAME: 'Full Name',       // ✅ Match this to your sheet
  NETID: 'Dartmouth NetID', // ✅ Match this to your sheet
  FIRST_CHOICE: 'Availability - Slot Preferences (Ranked) - First Preferred Time Slot',
  // ↑ Update this to match your actual column name
  ...
};
```

**How to update:**
1. Check your Google Sheet - what's the exact column header for slot preferences?
2. Copy it exactly
3. Paste it in the script

### Step 4: Update Other Settings

1. **STUDY_LOCATION** (line 25):
   ```javascript
   const STUDY_LOCATION = 'Dartmouth College'; // ⚠️ UPDATE THIS with actual location
   ```
   Change to your actual study location/address

2. **Time Slots** (already updated to 25 slots - should be correct)

3. **PI_EMAIL** (already set to `Tam.N.Vu@dartmouth.edu` - should be correct)

### Step 5: Authorize the Script

1. Click **Run** button (▶️) in Apps Script
2. Select `testScript` from the function dropdown
3. Click **Run**
4. You'll see an **"Authorization required"** dialog
5. Click **"Review permissions"**
6. Select your Google account
7. Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
8. Click **"Allow"**

**This allows the script to:**
- Read/write to Google Sheets
- Send emails through your Gmail account

### Step 6: Set Up Automatic Trigger

1. In Apps Script, click **Triggers** (⏰ clock icon) in the left sidebar
2. Click **+ Add Trigger** (bottom right)
3. Configure:
   - **Function to run:** `onFormSubmit`
   - **Event source:** `From form`
   - **Event type:** `On form submit`
   - **Failure notification settings:** `Notify me immediately`
4. Click **Save**

**Result:** The script will automatically run every time someone submits the registration form!

---

## PART 4: TESTING

### Test 1: Submit a Test Form

1. Open your registration form
2. Fill it out with test data:
   - Use your own email
   - Select some slot preferences
   - Submit the form
3. Check the Google Sheet:
   - New row should appear
   - Check if "Assigned Slot" column is filled
   - Check if "Email Sent" column says "Yes"
4. Check your email:
   - You should receive a confirmation email

### Test 2: Check Execution Log

1. In Apps Script, click **Execution log** (📋 icon)
2. You should see logs showing:
   - "Processing submission..."
   - "Successfully assigned [name] to [slot]"
   - "Confirmation email sent to [email]"

### Test 3: Process Existing Submissions

If you have existing submissions that weren't processed:

1. In Apps Script, select `processAllPendingSubmissions` from function dropdown
2. Click **Run**
3. This will process all unprocessed submissions

---

## PART 5: TROUBLESHOOTING

### Column Names Not Found Error

**Symptom:** Script shows "Column not found" errors

**Solution:**
1. Open your Google Sheet
2. Look at Row 1 (column headers)
3. Copy the exact column names
4. Update the `COLUMNS` object in Apps Script
5. Make sure spelling, capitalization, and spaces match exactly

### Emails Not Sending

**Possible causes:**
1. Gmail daily sending limit (100 emails/day for free accounts)
2. Email address invalid in form
3. Script not authorized properly

**Solution:**
- Check execution log for errors
- Verify email addresses are valid
- Re-authorize the script if needed

### Wrong Slot Assignments

**Possible causes:**
1. Slot names don't match exactly
2. Slot count logic not working

**Solution:**
- Verify slot names in `TIME_SLOTS` array match form options exactly
- Check `getSlotCount()` function is working
- Review execution logs

### Script Not Running Automatically

**Solution:**
1. Check triggers are set up correctly
2. Verify trigger is enabled (not paused)
3. Check execution log for errors
4. Try manual trigger: `testScript()`

---

## PART 6: MONITORING YOUR DATA

### Viewing Consent Form Responses

1. Open your **Consent Form Responses** Google Sheet
2. Each row = one participant who completed consent
3. Columns show: Timestamp, Name, Email, Consent checkboxes, etc.

### Viewing Registration Responses

1. Open your **Registration Form Responses** Google Sheet
2. Each row = one participant who registered
3. Columns show:
   - Basic info (Email, Name, NetID)
   - Slot preferences (1st, 2nd, 3rd choice)
   - **Assigned Slot** (filled by script)
   - **Email Sent** (Yes/No)
   - **Notes** (for waiting list entries)

### Slot Availability Dashboard

You can create a simple dashboard in Google Sheets:

1. Create a new sheet tab called "Slot Dashboard"
2. List all 25 slots
3. Use COUNTIF formulas to count participants per slot:
   ```
   =COUNTIF('Form Responses 1'!G:G, "Monday 9:00 AM - 11:00 AM")
   ```
4. Color code: Green (< 5), Yellow (= 5), Red (> 5)

---

## PART 7: CONSENT FORM RESPONSES

### For Consent Form:

You don't need Apps Script automation for the consent form. You can:
- Manually review consent responses in the Google Sheet
- Export to CSV if needed
- Track who has consented

### Linking Consent to Registration:

If you want to verify participants completed consent before processing registration:
- Use email address to match (both forms collect email)
- Or add a checkbox in registration: "I have completed the consent form"

---

## SUMMARY CHECKLIST

### Before Going Live:

- [ ] Consent form linked to Google Sheets
- [ ] Registration form linked to Google Sheets
- [ ] Apps Script code pasted into Registration Form Responses sheet
- [ ] Column names updated to match actual sheet headers
- [ ] STUDY_LOCATION updated
- [ ] Script authorized
- [ ] Trigger set up (onFormSubmit)
- [ ] Test submission completed
- [ ] Test email received
- [ ] Slot assignment working correctly
- [ ] Execution log shows no errors

### After Going Live:

- [ ] Monitor execution log daily
- [ ] Check emails are being sent
- [ ] Verify slot assignments are correct
- [ ] Review waiting list entries
- [ ] Export data periodically for backup

---

## QUICK REFERENCE

### Access Your Sheets:
- **Consent Form Responses:** Google Drive → Find the sheet
- **Registration Form Responses:** Google Drive → Find the sheet

### Access Apps Script:
- Open Registration Form Responses sheet → Extensions → Apps Script

### View Execution Log:
- Apps Script → Execution log (📋 icon)

### View Triggers:
- Apps Script → Triggers (⏰ icon)

---

**Ready to set up?** Follow Parts 1-6 above step by step!

**Need help?** Check the troubleshooting section or review the code comments.

