package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Services.ResgisterEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/registroEmail")
public class RegisterEmailController {
    @Autowired
    ResgisterEmailService resgisterEmailService;

    @GetMapping()
    public ResponseEntity<?> registerEmail(@RequestBody Map<String, Object> requestBody) {
        String email = ((String) requestBody.get("email"));
        if(resgisterEmailService.emailRegistrado(email)) {
            return ResponseEntity.status(HttpStatus.FOUND).body("Encontrado");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No encontrado");
    }
}
