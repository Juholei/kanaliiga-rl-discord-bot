import { ThreadChannel, Message } from 'discord.js'
import { DocumentProcessor } from './DocumentProcessor'
import log from './log'


export class PostJob{

    groupId: number // Ballchasing groupID
    thread: ThreadChannel 
    queue: Message[] // array of Messages's
    processor: DocumentProcessor
    

    constructor(thread:ThreadChannel, groupId:number){
        this.groupId = groupId
        this.thread = thread
        this.queue = []
        this.processor = new DocumentProcessor()
    }

    addToQueue(newMessage:Message){
        if(this.queue.find(mes => mes.id === newMessage.id)){
            log.error('Message exists in queue already: ' + newMessage.id)
            return
        }
        log.info(`A new message was added to task ${this.thread.id}`)
        this.queue.push(newMessage)
    }

    removeFromQueue(): Message | undefined {
        return this.queue.shift()
    }

    clearQueue(){
        this.queue = []
    }

    size(): number {
        return this.queue.length
    }


    process() {

        

        while (this.size() > 0) {

            const message = this.removeFromQueue()

            const arrayOfMultifileEmojies = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣']

            message.attachments.forEach(async attachment => {

                const file = await this.processor.download(attachment.url)
                const fileName = attachment.url.split("/").at(-1)

                try {
                    const response = await this.processor.upload(file, fileName)
                    await message.channel.sendTyping()

                    setTimeout(() => {
                        message.channel.send(`Heres a link for you! ${response}`)
                    }, 3000);

                }
                catch (err) {
                    await message.channel.sendTyping()
                    setTimeout(() => {
                        message.channel.send(`There was an error uploading file: ${fileName} \nError: ${err}`)
                    }, 3000);

                    await message.react('🚫')
                    arrayOfMultifileEmojies.shift()
                    return
                }

                await message.react('✅')
                await message.react(arrayOfMultifileEmojies.shift())



            })
        }

    }




}