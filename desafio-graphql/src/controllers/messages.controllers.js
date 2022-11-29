import nodemailer from 'nodemailer';
import dotenvConfig from "../config/dotenv.config.js";

let email = dotenvConfig.nodemail.NM_EMAIL;
let code = dotenvConfig.nodemail.NM_CODE;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: email,
        pass: code
    }
});

const mailController =  async (req,res) => {
    try {
        let {message, cartId, userMail } = req.body;
        if (!message || !cartId || !userMail)
        return res
          .status(400)
          .send({ status: "error", error: "nonexistent product" }); 

        let messagePlus = `<br>
                            <p>Estimado Cliente, Gracias por su compra, su orden esta en proceso en breve nos contactaremos con usted para coordinar pago y entrega</p>
                            <br>
                            ${message}
                            <br>
                            Saludos Cordiales`
        let result = await transporter.sendMail({
            from: 'Ecommerce-Coderhouse',
            to: userMail,
            subject: `Orden de compra Nr ${cartId}`,
            html: messagePlus
        })
        res.status(200).json(result)
    } catch (error) {
        logger.log("error", `Error in mailController ${error} `);
        res.status(500).send({ error: error, message: "couldnt sendt mail" });
    }
}

export {
    mailController
}


