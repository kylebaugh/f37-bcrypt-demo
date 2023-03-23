const bcrypt = require('bcryptjs')

const chats = []

module.exports = {
    createMessage: (req, res) => {
        console.log(req.body)

        const {pin, message} = req.body

        for(let i = 0; i < chats.length; i++){
            let existingPin = bcrypt.compareSync(pin, chats[i].pinHash)

            if(existingPin){
                chats[i].messages.push(message)

                let secureMessage = {...chats[i]}
                delete secureMessage.pinHash

                res.status(200).send(secureMessage)
                return
            }
        }

        // console.log(pin)
        // console.log(message)

        const salt = bcrypt.genSaltSync(5)

        const pinHash = bcrypt.hashSync(pin, salt)

        // console.log(`Original pin: ${pin}`)
        // console.log(`Salt: ${salt}`)
        // console.log(`pinHash: ${pinHash}`)

        let msgObj = {
            pinHash,
            messages: [message]
        }

        chats.push(msgObj)

        let secureMessage = {...msgObj}
        delete secureMessage.pinHash

        console.log(chats)

        res.status(200).send(secureMessage)

    }
}