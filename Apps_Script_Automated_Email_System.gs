/**
 * Automated Email System for Study Registration
 * 
 * This script automatically:
 * 1. Monitors new registration form submissions
 * 2. Matches participants to available time slots (max 5 per slot)
 * 3. Sends confirmation emails to participants
 * 4. Updates slot availability tracking
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheets (where form responses go)
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Update the configuration section below
 * 5. Save the script
 * 6. Set up triggers (see instructions at bottom)
 */

// ==================== CONFIGURATION ====================

// Email Settings
const PI_EMAIL = 'Tam.N.Vu@dartmouth.edu'; // Principal Investigator email
const STUDY_NAME = 'On-Task Objective method of cognitive load assessment';
const STUDY_DURATION = '90-100 minutes';
const STUDY_LOCATION = 'Dartmouth College'; // Update with actual location

// Slot Configuration
const MAX_PARTICIPANTS_PER_SLOT = 5; // 5 iPads = 5 participants per slot

// Column Names (adjust if your form columns are different)
const COLUMNS = {
  TIMESTAMP: 'Timestamp',
  NAME: 'Full Name',
  EMAIL: 'Email Address',
  PHONE: 'Phone Number',
  CONTACT_METHOD: 'Preferred Contact Method',
  FIRST_CHOICE: '1st Choice Time Slot (Most Preferred)',
  SECOND_CHOICE: '2nd Choice Time Slot',
  THIRD_CHOICE: '3rd Choice Time Slot',
  ASSIGNED_SLOT: 'Assigned Slot',
  EMAIL_SENT: 'Email Sent',
  CONFIRMED: 'Confirmed',
  NOTES: 'Notes'
};

// Time Slots (adjust to match your actual slots)
const TIME_SLOTS = [
  'Monday 9:00 AM - 11:00 AM',
  'Monday 11:00 AM - 1:00 PM',
  'Monday 1:00 PM - 3:00 PM',
  'Monday 3:00 PM - 5:00 PM',
  'Tuesday 9:00 AM - 11:00 AM',
  'Tuesday 11:00 AM - 1:00 PM',
  'Tuesday 1:00 PM - 3:00 PM',
  'Tuesday 3:00 PM - 5:00 PM',
  'Wednesday 9:00 AM - 11:00 AM',
  'Wednesday 11:00 AM - 1:00 PM',
  'Wednesday 1:00 PM - 3:00 PM',
  'Wednesday 3:00 PM - 5:00 PM',
  'Thursday 9:00 AM - 11:00 AM',
  'Thursday 11:00 AM - 1:00 PM',
  'Thursday 1:00 PM - 3:00 PM',
  'Thursday 3:00 PM - 5:00 PM',
  'Friday 9:00 AM - 11:00 AM',
  'Friday 11:00 AM - 1:00 PM',
  'Friday 1:00 PM - 3:00 PM',
  'Friday 3:00 PM - 5:00 PM'
];

// ==================== MAIN FUNCTION ====================

/**
 * Main function called when form is submitted
 * This can be triggered automatically or run manually
 */
function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // Get the new submission data
    const newSubmission = getSubmissionData(sheet, lastRow);
    
    if (!newSubmission) {
      Logger.log('No new submission found');
      return;
    }
    
    // Check if already processed
    if (newSubmission.emailSent === 'Yes') {
      Logger.log('Submission already processed');
      return;
    }
    
    // Match participant to available slot
    const assignedSlot = matchParticipantToSlot(sheet, newSubmission);
    
    if (assignedSlot) {
      // Update sheet with assigned slot
      updateSubmission(sheet, lastRow, assignedSlot);
      
      // Send confirmation email
      sendConfirmationEmail(newSubmission, assignedSlot);
      
      // Mark as processed
      markAsProcessed(sheet, lastRow);
      
      Logger.log(`Successfully assigned ${newSubmission.name} to ${assignedSlot}`);
    } else {
      // No slots available - add to waiting list
      addToWaitingList(sheet, lastRow, newSubmission);
      sendWaitingListEmail(newSubmission);
      
      Logger.log(`${newSubmission.name} added to waiting list - no slots available`);
    }
    
  } catch (error) {
    Logger.log('Error processing submission: ' + error.toString());
    sendErrorNotification(error, e);
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get submission data from the sheet
 */
function getSubmissionData(sheet, row) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Find column indices
  const colIndices = {};
  headers.forEach((header, index) => {
    Object.keys(COLUMNS).forEach(key => {
      if (header === COLUMNS[key]) {
        colIndices[key] = index + 1; // Convert to 1-based index
      }
    });
  });
  
  // Get row data
  const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  return {
    timestamp: rowData[colIndices.TIMESTAMP - 1] || '',
    name: rowData[colIndices.NAME - 1] || '',
    email: rowData[colIndices.EMAIL - 1] || '',
    phone: rowData[colIndices.PHONE - 1] || '',
    contactMethod: rowData[colIndices.CONTACT_METHOD - 1] || '',
    firstChoice: rowData[colIndices.FIRST_CHOICE - 1] || '',
    secondChoice: rowData[colIndices.SECOND_CHOICE - 1] || '',
    thirdChoice: rowData[colIndices.THIRD_CHOICE - 1] || '',
    emailSent: rowData[colIndices.EMAIL_SENT - 1] || '',
    assignedSlot: rowData[colIndices.ASSIGNED_SLOT - 1] || ''
  };
}

/**
 * Match participant to an available slot based on preferences
 */
function matchParticipantToSlot(sheet, submission) {
  const preferences = [submission.firstChoice, submission.secondChoice, submission.thirdChoice];
  
  // Check each preference in order
  for (let i = 0; i < preferences.length; i++) {
    const slot = preferences[i];
    if (!slot) continue;
    
    const currentCount = getSlotCount(sheet, slot);
    
    if (currentCount < MAX_PARTICIPANTS_PER_SLOT) {
      return slot;
    }
  }
  
  // No preferred slots available
  return null;
}

/**
 * Get current participant count for a slot
 */
function getSlotCount(sheet, slotName) {
  const assignedSlotCol = findColumnIndex(sheet, COLUMNS.ASSIGNED_SLOT);
  if (!assignedSlotCol) return 0;
  
  const data = sheet.getRange(2, assignedSlotCol, sheet.getLastRow() - 1, 1).getValues();
  let count = 0;
  
  data.forEach(row => {
    if (row[0] === slotName) {
      count++;
    }
  });
  
  return count;
}

/**
 * Find column index by header name
 */
function findColumnIndex(sheet, headerName) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const index = headers.indexOf(headerName);
  return index >= 0 ? index + 1 : null;
}

/**
 * Update submission with assigned slot
 */
function updateSubmission(sheet, row, assignedSlot) {
  const assignedSlotCol = findColumnIndex(sheet, COLUMNS.ASSIGNED_SLOT);
  if (assignedSlotCol) {
    sheet.getRange(row, assignedSlotCol).setValue(assignedSlot);
  } else {
    // Column doesn't exist - create it
    const lastCol = sheet.getLastColumn();
    sheet.getRange(1, lastCol + 1).setValue(COLUMNS.ASSIGNED_SLOT);
    sheet.getRange(row, lastCol + 1).setValue(assignedSlot);
  }
}

/**
 * Mark submission as processed
 */
function markAsProcessed(sheet, row) {
  const emailSentCol = findColumnIndex(sheet, COLUMNS.EMAIL_SENT);
  if (emailSentCol) {
    sheet.getRange(row, emailSentCol).setValue('Yes');
  } else {
    // Create column if it doesn't exist
    const lastCol = sheet.getLastColumn();
    sheet.getRange(1, lastCol + 1).setValue(COLUMNS.EMAIL_SENT);
    sheet.getRange(row, lastCol + 1).setValue('Yes');
  }
}

/**
 * Add to waiting list
 */
function addToWaitingList(sheet, row, submission) {
  const notesCol = findColumnIndex(sheet, COLUMNS.NOTES);
  const note = `Waiting list - Preferences: 1st: ${submission.firstChoice}, 2nd: ${submission.secondChoice}, 3rd: ${submission.thirdChoice}`;
  
  if (notesCol) {
    sheet.getRange(row, notesCol).setValue(note);
  } else {
    const lastCol = sheet.getLastColumn();
    sheet.getRange(1, lastCol + 1).setValue(COLUMNS.NOTES);
    sheet.getRange(row, lastCol + 1).setValue(note);
  }
}

/**
 * Send confirmation email to participant
 */
function sendConfirmationEmail(submission, assignedSlot) {
  const subject = `Study Session Confirmed - ${STUDY_NAME}`;
  
  const body = `
Dear ${submission.name},

Thank you for registering to participate in our research study!

Your study session has been confirmed:

📅 Date & Time: ${assignedSlot}
⏱️ Duration: ${STUDY_DURATION}
📍 Location: ${STUDY_LOCATION}

Please arrive 10 minutes early to allow time for setup.

WHAT TO EXPECT:
- You will wear a FRENZ headband during the study
- You will complete various cognitive tasks and games
- You will answer questionnaires about your experience
- The session will take approximately ${STUDY_DURATION}

COMPENSATION:
You will receive an Amazon gift card upon completion of the study session.

If you need to reschedule or have any questions, please contact us at:
${PI_EMAIL}

We look forward to working with you!

Best regards,
Research Team
Dartmouth College
  `.trim();
  
  try {
    MailApp.sendEmail({
      to: submission.email,
      subject: subject,
      body: body
    });
    Logger.log(`Confirmation email sent to ${submission.email}`);
  } catch (error) {
    Logger.log(`Error sending email to ${submission.email}: ${error.toString()}`);
  }
}

/**
 * Send waiting list email
 */
function sendWaitingListEmail(submission) {
  const subject = `Study Registration - Waiting List - ${STUDY_NAME}`;
  
  const body = `
Dear ${submission.name},

Thank you for registering to participate in our research study!

Unfortunately, all of your preferred time slots are currently full. We have added you to our waiting list.

YOUR PREFERENCES:
1st Choice: ${submission.firstChoice}
2nd Choice: ${submission.secondChoice}
3rd Choice: ${submission.thirdChoice}

We will contact you immediately if a slot becomes available that matches your preferences.

If you have any questions, please contact us at:
${PI_EMAIL}

Thank you for your patience!

Best regards,
Research Team
Dartmouth College
  `.trim();
  
  try {
    MailApp.sendEmail({
      to: submission.email,
      subject: subject,
      body: body
    });
    Logger.log(`Waiting list email sent to ${submission.email}`);
  } catch (error) {
    Logger.log(`Error sending waiting list email: ${submission.email}: ${error.toString()}`);
  }
}

/**
 * Send error notification to PI
 */
function sendErrorNotification(error, event) {
  const subject = `Error in Study Registration System`;
  const body = `An error occurred processing a registration form submission:

Error: ${error.toString()}

Please check the Apps Script logs for more details.

Event details: ${JSON.stringify(event)}`;
  
  try {
    MailApp.sendEmail({
      to: PI_EMAIL,
      subject: subject,
      body: body
    });
  } catch (e) {
    Logger.log('Failed to send error notification: ' + e.toString());
  }
}

// ==================== MANUAL PROCESSING ====================

/**
 * Process all unprocessed submissions manually
 * Useful for testing or processing existing submissions
 */
function processAllPendingSubmissions() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    Logger.log('No submissions to process');
    return;
  }
  
  for (let row = 2; row <= lastRow; row++) {
    const submission = getSubmissionData(sheet, row);
    
    if (submission.emailSent === 'Yes' || !submission.email) {
      continue; // Skip already processed or missing email
    }
    
    const assignedSlot = matchParticipantToSlot(sheet, submission);
    
    if (assignedSlot) {
      updateSubmission(sheet, row, assignedSlot);
      sendConfirmationEmail(submission, assignedSlot);
      markAsProcessed(sheet, row);
    } else {
      addToWaitingList(sheet, row, submission);
      sendWaitingListEmail(submission);
      markAsProcessed(sheet, row);
    }
  }
  
  Logger.log('Finished processing all pending submissions');
}

// ==================== SETUP TRIGGERS ====================

/**
 * Set up automatic trigger for form submissions
 * Run this function once to set up the trigger
 */
function setupTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Get the form (you'll need to get the form ID from your form URL)
  // The form ID is the part between /d/e/ and /viewform
  // You can also link it to the spreadsheet instead
  const sheet = SpreadsheetApp.getActiveSheet();
  const form = FormApp.openByUrl(sheet.getParent().getFormUrl());
  
  // Create trigger
  ScriptApp.newTrigger('onFormSubmit')
    .onFormSubmit()
    .create();
  
  Logger.log('Trigger set up successfully!');
}

/**
 * Manual function to test the script
 */
function testScript() {
  Logger.log('Testing script...');
  processAllPendingSubmissions();
  Logger.log('Test complete. Check logs for details.');
}

