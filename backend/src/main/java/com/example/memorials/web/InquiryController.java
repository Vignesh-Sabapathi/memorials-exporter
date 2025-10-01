package com.example.memorials.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = {"*"})
public class InquiryController {

    private final JavaMailSender mailSender;

    @Value("${app.inquiry.mail.to}")
    private String toAddress;

    @Value("${app.inquiry.mail.from}")
    private String fromAddress;

    public InquiryController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping
    public String submit(@RequestBody Map<String, Object> payload) {
        // Convert JSON map to a readable string
        StringBuilder body = new StringBuilder("New inquiry received:\n\n");
        payload.forEach((k, v) -> body.append(k).append(": ").append(v).append("\n"));

        // Send email
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(toAddress);
        msg.setFrom(fromAddress);
        msg.setSubject("[INQUIRY] " + payload.getOrDefault("contactOrSample", ""));
        msg.setText(body.toString());
        mailSender.send(msg);

        return "Inquiry sent!";
    }
}