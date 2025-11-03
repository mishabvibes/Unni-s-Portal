/**
 * Setup cron job for weekly blog generation
 * This script sets up node-cron to automatically generate blog posts
 * 
 * Usage:
 *   node scripts/setup-cron.js
 */

const cron = require('node-cron')
const { generateWeeklyBlogs } = require('./generate-weekly-blogs')

console.log('📅 Setting up weekly blog generation cron job...')

// Run every Monday at 9:00 AM
const schedule = '0 9 * * 1'
console.log(`⏰ Schedule: Every Monday at 9:00 AM (${schedule})`)

// Create cron job
const job = cron.schedule(schedule, async () => {
  console.log('🔔 Cron job triggered!')
  await generateWeeklyBlogs()
}, {
  scheduled: true,
  timezone: 'UTC'
})

console.log('✅ Cron job scheduled!')
console.log('🚀 The job will run automatically every Monday at 9:00 AM UTC')
console.log('💡 To stop: Press Ctrl+C')

// Keep the process alive
console.log('⏳ Waiting for scheduled time...')

