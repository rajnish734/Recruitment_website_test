# Registration Form with 2-Hour Slot Selection

## Updated Availability Section for Registration Form

Replace the simple availability fields with the following slot selection system:

---

## FIELD: Availability - Slot Preferences (Ranked)

**Field Type:** Multiple choice grid (Required)

**Question:**
```
Please select your top 3 preferred time slots for the study session (90-100 minutes). 
Rank them as your 1st, 2nd, and 3rd choice. *
```

**Instructions:**
- Select your 1st choice (most preferred)
- Select your 2nd choice
- Select your 3rd choice
- You must select exactly 3 different slots

---

## SLOT STRUCTURE (2-Hour Slots)

### Monday - Friday Schedule:

**Morning Slots:**
- Monday 9:00 AM - 11:00 AM
- Monday 11:00 AM - 1:00 PM
- Tuesday 9:00 AM - 11:00 AM
- Tuesday 11:00 AM - 1:00 PM
- Wednesday 9:00 AM - 11:00 AM
- Wednesday 11:00 AM - 1:00 PM
- Thursday 9:00 AM - 11:00 AM
- Thursday 11:00 AM - 1:00 PM
- Friday 9:00 AM - 11:00 AM
- Friday 11:00 AM - 1:00 PM

**Afternoon Slots:**
- Monday 1:00 PM - 3:00 PM
- Monday 3:00 PM - 5:00 PM
- Tuesday 1:00 PM - 3:00 PM
- Tuesday 3:00 PM - 5:00 PM
- Wednesday 1:00 PM - 3:00 PM
- Wednesday 3:00 PM - 5:00 PM
- Thursday 1:00 PM - 3:00 PM
- Thursday 3:00 PM - 5:00 PM
- Friday 1:00 PM - 3:00 PM
- Friday 3:00 PM - 5:00 PM

**Total: 20 slots per week**

---

## GOOGLE FORMS SETUP OPTIONS

### Option 1: Multiple Choice Grid (Recommended for Ranking)

**Setup:**
1. Add "Multiple choice grid" question type
2. Rows = Time slots (all 20 slots listed)
3. Columns = Ranking (1st Choice, 2nd Choice, 3rd Choice)
4. Settings:
   - ✅ Required
   - ✅ Limit to one response per column (participant can only select each rank once)
   - ✅ Shuffle row order: OFF

**Limitation:** Participants might select the same slot multiple times if not careful

---

### Option 2: Three Separate Questions (Better Control)

This gives better validation and prevents selecting the same slot twice.

#### FIELD A: First Choice Slot
**Field Type:** Dropdown (Required)

**Question:**
```
1st Choice Time Slot (Most Preferred) *
```

**Options:**
- Monday 9:00 AM - 11:00 AM
- Monday 11:00 AM - 1:00 PM
- Monday 1:00 PM - 3:00 PM
- Monday 3:00 PM - 5:00 PM
- Tuesday 9:00 AM - 11:00 AM
- Tuesday 11:00 AM - 1:00 PM
- Tuesday 1:00 PM - 3:00 PM
- Tuesday 3:00 PM - 5:00 PM
- Wednesday 9:00 AM - 11:00 AM
- Wednesday 11:00 AM - 1:00 PM
- Wednesday 1:00 PM - 3:00 PM
- Wednesday 3:00 PM - 5:00 PM
- Thursday 9:00 AM - 11:00 AM
- Thursday 11:00 AM - 1:00 PM
- Thursday 1:00 PM - 3:00 PM
- Thursday 3:00 PM - 5:00 PM
- Friday 9:00 AM - 11:00 AM
- Friday 11:00 AM - 1:00 PM
- Friday 1:00 PM - 3:00 PM
- Friday 3:00 PM - 5:00 PM

**Settings:**
- ✅ Required

#### FIELD B: Second Choice Slot
**Field Type:** Dropdown (Required)

**Question:**
```
2nd Choice Time Slot *
```

**Options:** (Same list as above)

**Settings:**
- ✅ Required

#### FIELD C: Third Choice Slot
**Field Type:** Dropdown (Required)

**Question:**
```
3rd Choice Time Slot *
```

**Options:** (Same list as above)

**Settings:**
- ✅ Required

**Note:** Google Forms doesn't have built-in validation to prevent selecting the same slot twice, but you can add this in Apps Script (see below).

---

## AUTOMATED EMAIL SYSTEM SETUP

### Overview:
You'll need Google Apps Script to:
1. Monitor the Google Sheets for new registrations
2. Check slot availability (max 5 participants per slot)
3. Match participants to their preferred available slots
4. Send confirmation emails automatically
5. Update slot availability

---

## GOOGLE APPS SCRIPT SOLUTION

### Step 1: Create the Script

1. Open your Google Sheets (where form responses go)
2. Go to **Extensions** → **Apps Script**
3. Create a new script file

### Step 2: Script Functions Needed

You'll need:
- Function to check slot availability
- Function to match participants to slots
- Function to send confirmation emails
- Function to update slot counts

### Step 3: Trigger Setup

- Set up time-driven trigger (runs daily/hourly)
- Or set up form submission trigger (runs when someone submits)

---

## SIMPLER ALTERNATIVE: Manual Process with Automation Help

If full automation is complex, consider:

### Semi-Automated Approach:
1. **Google Sheets Dashboard:**
   - Create a sheet that shows slot availability
   - Formulas to count participants per slot
   - Color coding (green = available, red = full)

2. **Email Template:**
   - Create email templates in Gmail
   - Use mail merge or simple copy-paste

3. **Manual Matching:**
   - Review new registrations
   - Match to available slots
   - Send emails using template

### Tools That Can Help:
- **Google Sheets Add-ons:** Email Merge, Mail Merge
- **Zapier:** Connect Google Forms → Send emails (paid)
- **Make.com (formerly Integromat):** Similar to Zapier

---

## RECOMMENDED IMPLEMENTATION APPROACH

### Phase 1: Start Simple
1. Use the three separate dropdown fields (Option 2 above)
2. Set up Google Sheets to track responses
3. Create a simple dashboard showing slot counts
4. Manually match participants initially

### Phase 2: Add Automation
1. Once you understand the flow, add Apps Script
2. Automate email sending
3. Automate slot matching

---

## GOOGLE SHEETS TRACKING STRUCTURE

Your response sheet will have columns like:
- Timestamp
- Full Name
- Email Address
- Phone Number
- Preferred Contact Method
- 1st Choice Slot
- 2nd Choice Slot
- 3rd Choice Slot
- Assigned Slot (filled by script/manually)
- Email Sent (Yes/No)
- Confirmed (Yes/No)

---

## NEXT STEPS

Would you like me to:
1. **Create the complete Apps Script code** for automated email sending?
2. **Create a Google Sheets template** with formulas for slot tracking?
3. **Start with the simpler manual approach** and help you set up the form?

Let me know which approach you prefer, and I'll create the detailed implementation guide!

