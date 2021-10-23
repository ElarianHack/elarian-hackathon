const { Elarian } = require('elarian')
const axios = require('axios')

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
    let customer = new client.Customer({
        number: '+254719383956',
        provider: 'cellular'
    })

    const resp = customer.sendMessage(smsChannel, {
        body: {
            text: `You have been connected...`
        }
    })
    console.log('Sent connected message...')

}

async function handleUssd(notification, customer, appData, callback) {
    console.log(notification)

    customer = new client.Customer({
        number: '+254719383956',
        provider: 'cellular'
    })

    const input = notification.input.text

    const menu = {
        text: '',
        isTerminal: false
    }

    if (input === '') {
        menu.text = 'Do you wish to get your 2FA code?\n'
        menu.text += '1. Yes!\n2. No!\n'

        callback(menu, appData)

    }
    else if (parseInt(input) === 1) {
        let response = await axios.get('http://localhost:8000/send')


        const resp = customer.sendMessage(smsChannel, {
            body: {
                text: `Your 2FA code is ${response.data}. Do not share it with anyone.`
            }
        })
        menu.text = 'You will receive your code shortly...'
        console.log('Sent connected message...')
        menu.isTerminal = true

        callback(menu, appData)
    }

    else if (parseInt(input) === 2) {
        menu.text = 'Request cancelled. Thank you.'
        menu.isTerminal = true

        callback(menu, appData)
    }
}

client
    .on('error', (err) => console.error(err))
    .on(gId: 'el_org_eu_CCi7AV',
    appId: 'el_app_ad5gdI',
    apiKey: 'el_k_test_4a422c321b9aaff718337ed4b66181f2a3a1c3f63131447d23adec458ccbf2ec'
});'connected', onConnected)
    .on('ussdSession', handleUssd)
    .connect();
