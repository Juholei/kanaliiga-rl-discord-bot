export class DocumentProcessor {
    async upload(file:string) {
        console.log(`Uploading:  ${file}`)
        return true
    }
    async download(url: string) {
        console.log(`Downloading:  ${url}`)
        return url
    }
}