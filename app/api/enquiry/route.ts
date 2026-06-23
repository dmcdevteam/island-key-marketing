import { NextRequest } from 'next/server'
import { Resend } from 'resend'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function fieldRow(label: string, value: string | string[] | number | undefined): string {
  if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) return ''
  const display = Array.isArray(value) ? value.join(', ') : String(value)
  return `
    <tr>
      <td style="padding:8px 16px 8px 0;font-size:12px;color:rgba(253,252,250,0.5);white-space:nowrap;vertical-align:top;font-family:sans-serif;">
        ${esc(label)}
      </td>
      <td style="padding:8px 0;font-size:13px;color:#FDFCFA;font-family:sans-serif;">
        ${esc(display)}
      </td>
    </tr>
  `
}

export async function POST(request: NextRequest) {
  let body: Record<string, string | string[] | number>
  try {
    body = await request.json()
  } catch {
    return Response.json({ success: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const type = body.type as string
  const contactName = (body.contact_name as string) || ''
  const email = (body.email as string) || ''
  const whatsapp = (body.whatsapp as string) || ''

  if (!type || !contactName || !email || !whatsapp) {
    return Response.json(
      { success: false, message: 'Missing required fields: type, contact_name, email, whatsapp.' },
      { status: 400 }
    )
  }

  const isHost = type === 'host'
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Athens' })
  // Normalise enquirer's WhatsApp number for wa.me link
  const whatsappNum = whatsapp
    .replace(/[\s\-\(\)\+]/g, '')
    .replace(/^0/, '30') // Greek default if no country code

  const subject = isHost
    ? `Host Application \u2014 ${body.property_name || 'Unknown'}, ${body.location || 'Unknown'}`
    : `Operator Application \u2014 ${body.business_name || 'Unknown'}, ${body.service_category || 'Unknown'}`

  const typeLabel = isHost ? 'HOST' : 'OPERATOR'

  const waMessage = encodeURIComponent(
    `Hi ${contactName}, this is Island Key following up on your ${isHost ? 'host' : 'operator'} application. Thanks for applying — when is a good time to chat?`
  )
  const waLink = whatsappNum ? `https://wa.me/${whatsappNum}?text=${waMessage}` : ''

  const fieldRows = isHost
    ? [
        fieldRow('Contact Name', contactName),
        fieldRow('Email', email),
        fieldRow('WhatsApp', whatsapp),
        fieldRow('Property Name', body.property_name as string),
        fieldRow('Property Type', body.property_type as string),
        fieldRow('Location', body.location as string),
        fieldRow('Units', body.unit_count as string),
        fieldRow('Monthly Guests', body.monthly_guests as string),
        fieldRow('Operating Months', body.operating_months as string[]),
        fieldRow('Current Experience', body.current_experience as string),
        fieldRow('Guest Requests', body.guest_requests as string),
        fieldRow('Experience Importance', body.experience_importance as number),
        fieldRow('Vision', body.vision as string),
        fieldRow('Website / Instagram', body.website_or_instagram as string),
      ].join('')
    : [
        fieldRow('Contact Name', contactName),
        fieldRow('Email', email),
        fieldRow('WhatsApp', whatsapp),
        fieldRow('Service Category', body.service_category as string),
        fieldRow('Business Name', body.business_name as string),
        fieldRow('Description', body.description as string),
        fieldRow('Operating Location', body.operating_location as string),
        fieldRow('Coverage Limits', body.coverage_limits as string),
        fieldRow('Operating Months', body.operating_months as string[]),
        fieldRow('Weekly Capacity', body.weekly_capacity as string),
        fieldRow('Min Group Size', body.min_group_size as string),
        fieldRow('Advance Notice', body.advance_notice as string),
        fieldRow('Years Operating', body.years_operating as string),
        fieldRow('Online Presence', body.online_presence as string),
        fieldRow('Booking Methods', body.booking_methods as string[]),
      ].join('')

  const html = `
    <div style="font-family:sans-serif;max-width:600px;padding:32px;background:#0F0F0F;color:#FDFCFA;">
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:300;letter-spacing:2px;">
        ISLAND KEY \u2014 ${typeLabel} APPLICATION
      </h2>
      <p style="margin:0 0 24px;font-size:12px;opacity:0.5;letter-spacing:1px;">
        Received via islandkey.gr \u2014 ${timestamp}
      </p>
      <table style="border-collapse:collapse;width:100%;">
        ${fieldRows}
      </table>
      ${waLink ? `<a href="${waLink}"
         style="display:inline-block;margin-top:24px;padding:12px 24px;
                background:#C8F435;color:#0F0F0F;text-decoration:none;
                font-size:12px;letter-spacing:2px;">
        REPLY ON WHATSAPP \u2192
      </a>` : ''}
    </div>
  `

  if (!process.env.RESEND_API_KEY) {
    console.log('[enquiry] No RESEND_API_KEY \u2014 logging enquiry:')
    console.log({ type, contactName, email, whatsapp })
    return Response.json({ success: true })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: `Island Key <${process.env.ENQUIRY_FROM ?? 'hello@islandkey.gr'}>`,
      to: process.env.ENQUIRY_TO ?? 'islandkeygr@gmail.com',
      subject,
      html,
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error('[enquiry] Resend error:', err)
    return Response.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
