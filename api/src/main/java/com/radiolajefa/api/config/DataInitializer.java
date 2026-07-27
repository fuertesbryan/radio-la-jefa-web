package com.radiolajefa.api.config;

import com.radiolajefa.api.model.Programa;
import com.radiolajefa.api.repository.ProgramaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProgramaRepository programaRepository;

    public DataInitializer(ProgramaRepository programaRepository) {
        this.programaRepository = programaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (programaRepository.count() == 0) {
            programaRepository.save(new Programa(
                null,
                "El Mañanero de La Jefa",
                "Carlos 'El Patrón' Mendoza",
                "06:00 - 09:00 AM",
                "Entretenimiento y Noticias",
                "EN VIVO",
                15400,
                "El programa matutino más escuchado con las mejores noticias, humor y arranque musical del día."
            ));

            programaRepository.save(new Programa(
                null,
                "Las Rancheras Consentidas",
                "María José Rivas",
                "09:00 - 12:00 PM",
                "Música Popular",
                "PROGRAMADO",
                12800,
                "Espacio dedicado a los grandes éxitos de la música ranchera y mexicana de todos los tiempos."
            ));

            programaRepository.save(new Programa(
                null,
                "La Jefa Deportes y Pasión",
                "Roberto 'El Chino' Salazar",
                "12:00 - 02:00 PM",
                "Deportes",
                "PROGRAMADO",
                9500,
                "Análisis deportivo nacional e internacional, entrevistas exclusivas y debate en vivo."
            ));

            programaRepository.save(new Programa(
                null,
                "Tarde Latina y Cumbia VIP",
                "Dj Alex 'La Sombra'",
                "02:00 - 06:00 PM",
                "Música Variada",
                "PROGRAMADO",
                18200,
                "Los ritmos más bailables, peticiones del público en vivo y mezclas exclusivas para alegrar la tarde."
            ));

            programaRepository.save(new Programa(
                null,
                "Noche Estelar de La Jefa",
                "Fernando Torres",
                "08:00 - 11:00 PM",
                "Romántico y Baladas",
                "GRABADO",
                8300,
                "Música romántica, mensajes del público y reflexiones nocturnas con la mejor compañía."
            ));

            System.out.println(">>> [RADIO LA JEFA] Datos iniciales de programación cargados exitosamente.");
        }
    }
}
