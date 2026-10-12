// Tech Karma Classes - WhatsApp Notification Service

export const sendWhatsAppNotification = async ({ name, phone, email = '', className = '', message = '', source = 'Visitor' }) => {
    const adminPhone = process.env.ADMIN_WHATSAPP_PHONE || '918130550381';
    const apiKey = process.env.CALLMEBOT_API_KEY || '';

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const textLines = [
        `🔔 *Tech Karma Classes - New Alert!*`,
        `📍 *Source:* ${source}`,
        `👤 *Name:* ${name || 'N/A'}`,
        `📱 *Mobile/WhatsApp:* ${phone || 'N/A'}`
    ];

    if (className) {
        textLines.push(`🎓 *Class/Course:* ${className}`);
    }
    if (email) {
        textLines.push(`📧 *Email:* ${email}`);
    }
    if (message && message !== 'New Website Visitor') {
        textLines.push(`💬 *Message:* ${message}`);
    }
    textLines.push(`⏰ *Time:* ${timestamp}`);

    const fullMessage = textLines.join('\n');
    const waDirectUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(fullMessage)}`;

    console.log('\n====================================');
    console.log('📢 NEW LEAD / REGISTRATION ALERT:');
    console.log(fullMessage);
    console.log('====================================\n');

    // 1. If CallMeBot API key is present, send direct WhatsApp notification
    if (apiKey) {
        try {
            const endpoint = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(adminPhone)}&text=${encodeURIComponent(fullMessage)}&apikey=${encodeURIComponent(apiKey)}`;
            const response = await fetch(endpoint, { method: 'GET' });
            const respText = await response.text();
            console.log('WhatsApp CallMeBot response:', response.status, respText.slice(0, 100));
            return { success: true, method: 'callmebot', waDirectUrl };
        } catch (err) {
            console.error('CallMeBot notification error:', err.message);
        }
    }

    return { success: true, method: 'logged', waDirectUrl };
};

export default { sendWhatsAppNotification };
