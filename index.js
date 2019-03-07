'use strict'

/* global sealdSDK, saveAs */

// seald API-Dev keys
const host = 'https://api-dev.soyouz.seald.io/'
const teamId = '00000000-0000-0000-da71-000000007ea3'
const sdkTokenPublic = '00000000-0000-0000-da71-0000000005dc'

function progressCallback (percentage) {
  console.log('sealing progress: ', Math.floor(percentage * 100))
}

function sealCallback (err, sealedFile) {
  if (err) {
    console.log('err: ', err)
    document.getElementById('errorMessage').style.display = 'inherit'
  } else {
    console.log('cb: ', sealedFile)
    window.sealdFile = sealedFile
    document.getElementById('dlButton').style.display = 'inherit'
  }
}

function clickedSeal (e) { // eslint-disable-line no-unused-vars
  // Reset GUI
  document.getElementById('dlButton').style.display = 'none'
  document.getElementById('errorMessage').style.display = 'none'

  // Get the uploaded File
  const uploadedFile = document.getElementById('fileInput').files[0]
  window.sealdFileName = uploadedFile.name + '.shtml'

  const emails = ['test@test.test']
  // Seal file
  sealdSDK.sealFile(host, teamId, sdkTokenPublic, uploadedFile, sealCallback, { progressCallback, emails })
}

function clickedDownload (e) { // eslint-disable-line no-unused-vars
  if (!window.sealdFile || !window.sealdFileName) return
  saveAs(window.sealdFile, window.sealdFileName)
}

function clickedMailSeal (e) { // eslint-disable-line no-unused-vars
  // Reset GUI
  window.sealdFileName = ''
  document.getElementById('dlButton').style.display = 'none'
  document.getElementById('errorMessage').style.display = 'none'

  const mailItem = {
    from: document.getElementById('mailFrom').value,
    to: [document.getElementById('mailTo').value],
    subject: document.getElementById('mailSubject').value,
    mailBody: document.getElementById('mailBody').value
  }
  console.log('mailObject: ', mailItem)

  // Seal mail
  window.sealdFileName = 'demoMail' + '.seald_mail.shtml'
  sealdSDK.sealMail(host, teamId, sdkTokenPublic, mailItem, sealCallback, { progressCallback })
}
