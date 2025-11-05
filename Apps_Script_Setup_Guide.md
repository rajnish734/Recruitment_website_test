# Google Apps Script Setup Guide - Automated Email System

## Overview
This guide explains how to set up the automated email system for your registration form. You can set this up **after** your form is already published and connected to the website.

**The script will work with:**
- New submissions going forward
- Existing submissions that haven't been processed yet

---

## WHEN TO SET THIS UP

You can set this up:
- ✅ **Now** - If you want automation from the start
- ✅ **Later** - After you've collected some registrations manually
- ✅ **Anytime** - The script will process all pending submissions

---

## STEP-BY-STEP SETUP

### Step 1: Open Apps Script
1. Open your Google Sheets (where form responses are saved)
2. Go to **Extensions** → **Apps Script**
3. A new tab will open with the script editor

### Step 2: Paste the Code
1. Delete any default code in the editor
2. Open the file: `Apps_Script_Automated_Email_System.gs`
3. Copy all the code
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) or press `Cmd+S`

### Step 3: Configure the Script
Update these values in the **CONFIGURATION** section (at the top of the code):

```javascript
const PI_EMAIL = 'Tam.N.Vu@dartmouth.edu'; // Already correct
const STUDY_NAME = 'On-Task Objective method of cognitive load assessment'; // Already correct
const STUDY_DURATION = '90-100 minutes'; // Already correct
const STUDY_LOCATION = 'Dartmouth College'; // ⚠️ UPDATE THIS with your actual location
```

**Important:** Update `STUDY_LOCATION` with your actual study location/address.

### Step 4: Update Column Names (If Needed)
Check if your form column names match these (lines 20-30):

```javascript
const COLUMNS = {
  TIMESTAMP: 'Timestamp',
  NAME: 'Full Name',
  EMAIL: 'Email Address',
  PHONE: 'Phone Number',
  CONTACT_METHOD: 'Preferred Contact Method',
  FIRST_CHOICE: '1st Choice Time Slot (Most Preferred)',
  SECOND_CHOICE: '2nd Choice Time Slot',
  THIRD_CHOICE: '3rd Choice Time Slot',
  ...
};
```

**If your column names are different**, update them to match exactly what appears in your Google Sheets.

### Step 5: Update Time Slots (If Needed)
Check the `TIME_SLOTS` array (lines 33-52) matches your actual slot options from the form.

**If your slots are different**, update the array to match exactly.

### Step 6: Set Up Trigger (Automated Processing)

**Option A: Form Submission Trigger (Recommended)**
1. In Apps Script, click **Triggers** (⏰ clock icon) in the left sidebar
2. Click **+ Add Trigger** (bottom right)
3. Configure:
   - **Function to run:** `onFormSubmit`
   - **Event source:** `From form`
   - **Event type:** `On form submit`
4. Click **Save**
5. If prompted, authorize the script (click "Review permissions" → "Allow")

**Option B: Time-Driven Trigger (Alternative)**
- Runs every hour/day and processes new submissions
- Useful if form submission trigger doesn't work
- Set up: Triggers → Add Trigger → Time-driven → Every hour

### Step 7: Test the Script

1. Click **Run** button (▶️) in Apps Script
2. Select `testScript` from the function dropdown
3. Click **Run**
4. Authorize the script when prompted:
   - Click "Review permissions"
   - Select your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
5. Check the execution log for any errors

### Step 8: Process Existing Submissions

If you have existing registrations that haven't been processed:

1. In Apps Script, select `processAllPendingSubmissions` from the function dropdown
2. Click **Run**
3. This will process all submissions that haven't been assigned slots yet

---

## HOW IT WORKS

### When Someone Submits the Form:

1. **Trigger fires** → `onFormSubmit()` function runs
2. **Gets submission data** → Reads the new row from Google Sheets
3. **Checks slot availability** → Counts how many participants are already in each slot
4. **Matches to slot** → Tries 1st choice, then 2nd, then 3rd
   - If slot has < 5 participants → Assigns to that slot
   - If all preferences full → Adds to waiting list
5. **Sends email** → Confirmation email or waiting list email
6. **Updates sheet** → Marks as processed, adds assigned slot

### Slot Matching Logic:

- **First Choice:** If available (has < 5 participants) → Assign
- **Second Choice:** If first choice full, check second choice
- **Third Choice:** If first two full, check third choice
- **Waiting List:** If all three full, add to waiting list

---

## EMAIL TEMPLATES

### Confirmation Email Includes:
- Participant name
- Assigned time slot
- Study duration
- Location
- What to expect
- Contact information
- Compensation information

### Waiting List Email Includes:
- Participant name
- Their three preferences
- Message that they're on waiting list
- Contact information

---

## TROUBLESHOOTING

### Script Not Running?
1. Check **Execution log** (View → Execution log)
2. Check **Triggers** are set up correctly
3. Verify column names match exactly
4. Check email addresses are valid

### Emails Not Sending?
1. Check **Execution log** for errors
2. Verify email addresses in form responses
3. Check Gmail daily sending limit (100 emails/day for free accounts)
4. Verify script has been authorized

### Wrong Slot Assignments?
1. Check slot names match exactly (case-sensitive)
2. Verify MAX_PARTICIPANTS_PER_SLOT is set correctly (currently 5)
3. Check slot counting function is working

### Column Not Found Errors?
1. Verify column names in `COLUMNS` object match your sheet headers exactly
2. Check for extra spaces or typos
3. Column names are case-sensitive

---

## MANUAL FUNCTIONS

### Process All Pending Submissions
- Run `processAllPendingSubmissions()` manually
- Processes all unprocessed submissions
- Useful for testing or catching up

### Test Script
- Run `testScript()` manually
- Tests the script without processing
- Good for debugging

---

## CUSTOMIZATION

### Change Email Template
Edit the `sendConfirmationEmail()` and `sendWaitingListEmail()` functions to customize email content.

### Change Slot Capacity
Update `MAX_PARTICIPANTS_PER_SLOT` (currently 5) if you add more iPads.

### Add More Slots
Add new slots to the `TIME_SLOTS` array.

### Change Matching Logic
Modify the `matchParticipantToSlot()` function to change how slots are assigned.

---

## SECURITY NOTES

- Script runs with your Google account permissions
- Only authorized users can access the script
- Email addresses are stored in Google Sheets
- Follow IRB data security requirements

---

## MONITORING

### Check Execution Log
- View → Execution log
- Shows when script runs and any errors

### Check Google Sheets
- Monitor the "Assigned Slot" column
- Check "Email Sent" column for "Yes"
- Review "Notes" column for waiting list entries

### Check Email
- Verify emails are being sent
- Check spam folders
- Monitor for bounce-backs

---

## NEXT STEPS AFTER SETUP

1. ✅ Test with a test submission
2. ✅ Verify emails are received
3. ✅ Check slot assignments are correct
4. ✅ Monitor for a few days
5. ✅ Adjust if needed

---

**Ready to set up?** Follow Steps 1-8 above!

**Need help?** Check the troubleshooting section or review the code comments.

