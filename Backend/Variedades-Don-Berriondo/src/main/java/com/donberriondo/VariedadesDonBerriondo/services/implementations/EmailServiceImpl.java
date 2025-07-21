package com.donberriondo.VariedadesDonBerriondo.services.implementations;

import com.donberriondo.VariedadesDonBerriondo.services.IEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailServiceImpl implements IEmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendProductAvailableEmail(String userEmail, String userName, String productName) {
        String[] subjects = {
                "¡Ojo pues! Su encargo llegó, ¡más rápido que chisme en pueblo!",
                "¡Párele bolas, que lo suyo ya está aquí!",
                "¡Noticia Berrionda! Su producto lo está esperando."
        };

        String[] bodies = {
                String.format("¡Quiubo, %s! ¿Se acuerda de ese %s que nos pidió con tanta fe? Pues déjeme decirle que ya lo tenemos aquí, más fresco que una lechuga y listo pa' que se lo lleve. ¡No se duerma en los laureles que esto vuela más rápido que billete de cien mil! Venga por él antes de que otro avispado se le adelante.", userName, productName),
                String.format("¡Ave María, %s! Le tenemos una noticia que le va a alegrar el día más que un festivo. Ese %s que tanto anhelaba ya aterrizó en nuestra tienda. Deje lo que esté haciendo y corra por él, que está más bueno que un tamal en diciembre. ¡No diga que no le avisamos!", userName, productName),
                String.format("¡Atención, %s! El universo ha conspirado a su favor. El %s que solicitó ha llegado, más esperado que la prima de mitad de año. ¡Póngase las pilas y venga a reclamar esta belleza antes de que se evapore! ¡Lo estamos esperando con el tinto listo!", userName, productName)
        };

        Random random = new Random();
        String subject = subjects[random.nextInt(subjects.length)];
        String body = bodies[random.nextInt(bodies.length)];

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@donberriondo.com");
        message.setTo(userEmail);
        message.setSubject(subject);
        message.setText(body + "\n\nAtentamente,\nEl equipo de Variedades Don Berriondo.");

        mailSender.send(message);
    }
}
