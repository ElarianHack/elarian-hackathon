const { Elarian } = require('elarian')
const log = require('signale')


const client = new Elarian({
    orgId: 'el_org_eu_CCi7AV',
    appId: 'el_app_ad5gdI',
    apiKey: 'el_k_test_4a422c321b9aaff718337ed4b66181f2a3a1c3f63131447d23adec458ccbf2ec'
});

const whatsAppChannel = {
    number: '+254719383956',
    channel: 'whatsapp'
}

const smsChannel = {
    number: '75923',
    channel: 'sms'
}

const paymentChannel = {
    number: '+254719383956',
    channel: 'whatsapp'
}


async function onConnected() {
    // Ready to interact with customers
    console.log('connected...')
    const customer = new client.Customer({
        number: '+254719383956',
        provider: 'cellular'
    })

    const resp = customer.sendMessage(smsChannel, {
        body: {
            text: "Hello......"
        }
    })

    const state = await customer.getState();

    const updateResult = await customer.updateMetadata({name: "William"})

    const reminderResult = await customer.addReminder({
        key: "loaner",
        payload: "USD 100",
        remindAt: (Date.now() + 60000) / 1000,
    })

}
async function onReminder(notification, customer, appData, callback){
    const loanAmount = notification.reminder.payload;
    const metadata = await customer.getMetadata()
    const message = `Hi ${metadata.name}, your loan repayment of ${loanAmount} is due`
    const newAppData = { loanReminderSent: 1 };
    callback(null, newAppData);
}


const purseId = 'el_prs_XJzcMr'

client
    .on('error', (err) => console.error(err))
    .on('connected', onConnected)
    .on('reminder', onReminder)
    .connect();
