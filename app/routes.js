const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/bin-type', function (req, res) {
  res.render('bin-type')
})

router.post('/bin-type', function (req, res) {
  const answer = req.session.data['bin-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'bin-type': 'Select what type of bin was not collected.' }
    return res.render('bin-type')
  }
  res.redirect('/collection-date')
})

router.get('/collection-date', function (req, res) {
  res.render('collection-date')
})

router.post('/collection-date', function (req, res) {
  const answer = req.session.data['collection-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'collection-date': 'Enter the date your bin should have been collected.' }
    return res.render('collection-date')
  }
  res.redirect('/bin-accessible')
})

router.get('/bin-accessible', function (req, res) {
  res.render('bin-accessible')
})

router.post('/bin-accessible', function (req, res) {
  const answer = req.session.data['bin-accessible']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'bin-accessible': 'Select when your bin was put out for collection.' }
    return res.render('bin-accessible')
  }
  if (answer === 'no-it-was-put-out-after-6am') {
    return res.redirect('/ineligible-bin-accessible')
  }
  res.redirect('/bin-location')
})

router.get('/ineligible-bin-accessible', function (req, res) {
  res.render('ineligible-bin-accessible')
})

router.get('/bin-location', function (req, res) {
  res.render('bin-location')
})

router.post('/bin-location', function (req, res) {
  const answer = req.session.data['bin-location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'bin-location': 'Select where your bin was placed for collection.' }
    return res.render('bin-location')
  }
  res.redirect('/postcode')
})

router.get('/postcode', function (req, res) {
  res.render('postcode')
})

router.post('/postcode', function (req, res) {
  const answer = req.session.data['postcode']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'postcode': 'Enter your postcode.' }
    return res.render('postcode')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('BIN')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
