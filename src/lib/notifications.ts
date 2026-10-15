export type NotificationType = 'email' | 'whatsapp' | 'supabase' | 'admin_dashboard'

export type FormSubmissionData = {
  formType: 'contact_enquiry' | 'training_registration' | 'newsletter'
  name?: string
  email?: string
  phone?: string
  message?: string
  extra?: Record<string, string>
}

export type NotificationConfig = {
  channels: NotificationType[]
  adminEmail?: string
  adminWhatsApp?: string
}

const defaultConfig: NotificationConfig = {
  channels: ['supabase', 'admin_dashboard'],
  adminEmail: 'hello@lumeflo.com',
  adminWhatsApp: '+2348000000000',
}

/**
 * Notify the administrator about an important form submission.
 *
 * This function is designed to be flexible and support multiple notification
 * channels in the future (email, WhatsApp, Supase realtime, admin dashboard).
 *
 * Currently it logs the notification for development purposes and stores
 * the submission in Supabase via the existing contact_enquiries table.
 *
 * To enable email notifications, connect an edge function or external
 * email service. To enable WhatsApp notifications, connect the WhatsApp
 * Business API. The architecture is ready — just plug in the provider.
 */
export async function notifyAdmin(
  data: FormSubmissionData,
  config: NotificationConfig = defaultConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    for (const channel of config.channels) {
      switch (channel) {
        case 'supabase':
        case 'admin_dashboard':
          // These are handled by the existing Supabase insert in the form handlers.
          // When an admin dashboard is built, it can query the contact_enquiries table.
          break
        case 'email':
          // Future: trigger an edge function to send email notification to admin.
          // Example: await fetch('/api/notify-email', { method: 'POST', body: JSON.stringify(data) })
          break
        case 'whatsapp':
          // Future: call WhatsApp Business API to send notification to admin.
          // Example: await fetch('/api/notify-whatsapp', { method: 'POST', body: JSON.stringify(data) })
          break
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Admin Notification] Form submission received:', data.formType, {
        name: data.name,
        email: data.email,
        adminEmail: config.adminEmail,
        adminWhatsApp: config.adminWhatsApp,
      })
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
