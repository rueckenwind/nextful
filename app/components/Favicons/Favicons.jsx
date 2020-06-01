import Parser from 'html-react-parser'
import faviconData from '../../../faviconData.json'

const faviconHtml = faviconData && faviconData.favicon.html_code
const Favicons = () => Parser(faviconHtml)

export default Favicons
