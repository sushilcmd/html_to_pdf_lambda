const chromium = require("chrome-aws-lambda");
const handlebars = require('handlebars');
const fs = require("fs");
const path = require('path');
const { data_mapping } = require('./src/dataMapping');
const { RES } = require('./src/response');

/**
 * Create a dynamic template using data and return a html string;
 * @param {templateData} reportData 
 */
const get_html = (reportData) => {
    const templateHtml = fs.readFileSync(path.join(process.cwd(), '/src/template.html'), 'utf-8');
    const template = handlebars.compile(templateHtml);
    const html = template(reportData);
    return html;
}

/**
 * convert_html_pdf function read html string and return buffer of that string 
 * @param {html as aString} html 
 */

const convert_html_pdf = async (html) => {
    try {
        let browser = null;
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless, // For headless local testing set this to true
            // headless: true, // For headless local testing set this to true
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();
        page.setContent(html);

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
        });

        const base64String = pdf.toString('base64');
        return base64String;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const reportData = data_mapping(body)
        const compiledContent = get_html(reportData);
        const base64String = await convert_html_pdf(compiledContent)

        const finalData = {
            fileName: 'report',
            type: 'pdf',
            base64Str: base64String
        }

        context.succeed(RES.SUCCESS(finalData));

    } catch (error) {
        console.log(error);
        return RES.FAILURE(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};