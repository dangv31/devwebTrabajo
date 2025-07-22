package com.donberriondo.VariedadesDonBerriondo.config;

import com.donberriondo.VariedadesDonBerriondo.models.entities.*;
import com.donberriondo.VariedadesDonBerriondo.repositories.RoleRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;

import com.donberriondo.VariedadesDonBerriondo.repositories.CategoryRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired private RoleRepository roleRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        loadRoles();
        loadAdminUser();
        loadCategoriesAndProducts();
    }

    private void loadRoles() {
        Arrays.stream(RoleEnum.values()).forEach(roleEnum -> {
            roleRepository.findByName(roleEnum)
                    .orElseGet(() -> roleRepository.save(new RoleEntity(null, roleEnum)));
        });
    }

    private void loadAdminUser() {
        String adminEmail = "admin@berriondo.com";
        userRepository.findByEmail(adminEmail).ifPresentOrElse(
                user -> System.out.println("El usuario administrador ya existe."),
                () -> {
                    RoleEntity adminRole = roleRepository.findByName(RoleEnum.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Rol ADMIN no encontrado."));
                    RoleEntity userRole = roleRepository.findByName(RoleEnum.USER)
                            .orElseThrow(() -> new RuntimeException("Error: Rol USER no encontrado."));

                    UserEntity adminUser = UserEntity.builder()
                            .name("Don")
                            .lastName("Berriondo")
                            .email(adminEmail)
                            .address("Calle Falsa 123")
                            .password(passwordEncoder.encode("admin123"))
                            .roles(Set.of(adminRole, userRole))
                            .build();
                    userRepository.save(adminUser);
                }
        );
    }

    private void loadCategoriesAndProducts() {
        List<String> categoryNames = List.of(
                "Tecnologia", "Electrodomesticos", "Hogar", "Muebles", "Decoracion",
                "Salud", "Ropa", "Aseo", "Papeleria", "Jugueteria", "Herramientas",
                "Cocina", "Iluminacion", "Mascotas"
        );

        Map<String, CategoryEntity> categories = categoryNames.stream()
                .map(name -> categoryRepository.findByName(name)
                        .orElseGet(() -> categoryRepository.save(CategoryEntity.builder().name(name).build())))
                .collect(Collectors.toMap(CategoryEntity::getName, Function.identity()));

        List<ProductData> productDataList = getProductDataList();

        for (ProductData data : productDataList) {
            productRepository.findByName(data.name).ifPresentOrElse(
                    p -> System.out.println("Producto ya existe: " + p.getName()),
                    () -> {
                        ProductEntity product = ProductEntity.builder()
                                .name(data.name)
                                .description(data.description)
                                .price(data.price)
                                .discount(data.oldPrice > 0 ? data.oldPrice - data.price : 0)
                                .imageRoute(data.imageRoute)
                                .category(categories.get(data.category))
                                .bestSeller(data.bestSeller)
                                .stock(data.stock)
                                .sales(data.sales)
                                .isEnabled(true)
                                .build();
                        productRepository.save(product);
                    }
            );
        }
    }

    private static class ProductData {
        String name, description, imageRoute, category;
        int price, oldPrice, stock, sales;
        boolean bestSeller;

        ProductData(String name, String description, int price, int oldPrice, String imageRoute, String category, boolean bestSeller, int stock, int sales) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.oldPrice = oldPrice;
            this.imageRoute = imageRoute;
            this.category = category;
            this.bestSeller = bestSeller;
            this.stock = stock;
            this.sales = sales;
        }
    }

    private List<ProductData> getProductDataList() {
        return List.of(
                new ProductData("Celular Inteligente Berriondo Max 5000", "Este no es cualquier celular...", 881000, 0, "http://localhost:8080/uploads/celular_inteligente_berriondo_max_5000.jpg", "Tecnologia", true, 5, 4),
                new ProductData("Audífonos Inalámbricos BerrinSound 360", "Estos audífonos berriondos le aíslan del mundo...", 40000, 0, "http://localhost:8080/uploads/audifonos_inalambricos_berrinsound_360.jpg", "Tecnologia", true, 9, 7),
                new ProductData("Reloj Inteligente BerriTime 4G", "Mide pasos, mide el corazón...", 156000, 185000, "http://localhost:8080/uploads/reloj_inteligente_berritime_4g.jpg", "Tecnologia", false, 3, 15),
                new ProductData("Tablet ChiquiBerri 10.1 Wi-Fi", "Con esta tablet berrionda puede trabajar...", 1270000, 1910000, "http://localhost:8080/uploads/tablet_chiquiberri_10.1_wi-fi.jpg", "Tecnologia", false, 7, 3),
                new ProductData("Licuadora TurboChimba 3000", "¡Mire esta berraquera de licuadora!...", 81000, 0, "http://localhost:8080/uploads/licuadora_turbochimba_3000.jpg", "Electrodomesticos", false, 8, 12),
                new ProductData("Nevera Antisantos XL", "¿Cansado de que se le dañe la comida?...", 3170400, 0, "http://localhost:8080/uploads/nevera_antisantos_xl.jpg", "Electrodomesticos", true, 1, 1),
                new ProductData("Microondas con Espíritu Santo", "Este no es un microondas cualquiera...", 120000, 181000, "http://localhost:8080/uploads/microondas_con_espiritu_santo.jpg", "Electrodomesticos", true, 7, 12),
                new ProductData("Sanduchera Milagrosa 7 en 1", "¿Aburrido del pan con mantequilla?...", 188000, 198000, "http://localhost:8080/uploads/sanduchera_milagrosa_7_en_1.jpg", "Electrodomesticos", true, 8, 17),
                new ProductData("Tostadora Inteligente 7B", "Esta no es cualquier tostadora...", 89900, 100000, "http://localhost:8080/uploads/tostadora_inteligente_7b.jpg", "Hogar", true, 5, 2),
                new ProductData("Almohada Antiestrés con Gritos Grabados", "¿El jefe lo tiene aburrido?...", 38000, 0, "http://localhost:8080/uploads/almohada_antiestres_con_gritos_grabados.jpg", "Hogar", false, 7, 0),
                new ProductData("Cobija Calentadora con Olor a Mamá", "¿Siente frío en el alma?...", 100000, 164000, "http://localhost:8080/uploads/cobija_calentadora_con_olor_a_mama.jpg", "Hogar", true, 4, 3),
                new ProductData("Silla Gamer Reclinable Intermunicipal 3000", "¡Mire esta belleza!...", 300000, 0, "http://localhost:8080/uploads/sillagamer.jpg", "Muebles", true, 2, 10),
                new ProductData("Tendedero Plegable Multinivel Berriondo", "¿No le cabe la ropa en el patio?...", 126400, 168000, "http://localhost:8080/uploads/tendedero_plegable_multinivel_berriondo.jpg", "Hogar", false, 7, 1),
                new ProductData("Cama Montañera XXL", "¡Ay, mi gente! ¡Esta no es cualquier cama...", 500000, 0, "http://localhost:8080/uploads/cama_montanera_xxl.jpg", "Hogar", true, -1, 20),
                new ProductData("Taza de café Chinchinense", "¡Parce, tómese el tinto con estilo!...", 30000, 50000, "http://localhost:8080/uploads/taza_de_cafe_chinchinense.jpg", "Hogar", false, 1, 50),
                new ProductData("Luces LED Caleñas", "¡Oiga, mire, vea! Póngale sabrosura a su casa...", 70000, 0, "http://localhost:8080/uploads/luces_led_calenas.jpg", "Hogar", false, -5, 5),
                new ProductData("Cuadro del Divino Niño con LEDs", "Póngale fe y estilo a su casa...", 97800, 167800, "http://localhost:8080/uploads/cuadro_del_divino_nino_con_leds.jpg", "Decoracion", false, 7, 8),
                new ProductData("Florero Antivuelco con Sensor de Chisme", "Decore su casa sin miedo a los regueros...", 50000, 175600, "http://localhost:8080/uploads/florero_antivuelco_con_sensor_de_chisme.jpg", "Decoracion", true, 9, 14),
                new ProductData("Reloj de Pared que Da Consejo", "¿No sabe qué hacer con su vida?...", 40000, 0, "http://localhost:8080/uploads/reloj_de_pared_que_da_consejo.jpg", "Decoracion", true, 8, 6),
                new ProductData("Adorno de Gallo que Canta el Himno", "¡Demuestre que es más colombiano que la arepa!...", 39750, 0, "http://localhost:8080/uploads/adorno_de_gallo_que_canta_el_himno.jpg", "Decoracion", false, 0, 15),
                new ProductData("Sofá Reversible con Espacio pa' Sobrinos", "¿Le llegó visita y no sabe dónde meterla?...", 100841, 179997, "http://localhost:8080/uploads/sofa_reversible_con_espacio_pa_sobrinos.jpg", "Muebles", false, 9, 7),
                new ProductData("Cama Nido con Cajón pa' Guardar Secretos", "Duerma como un rey y guarde sus tesoros...", 105007, 194191, "http://localhost:8080/uploads/cama_nido_con_cajon_pa_guardar_secretos.jpg", "Muebles", true, 10, 8),
                new ProductData("Mesa de Centro con Altavoz Reguetonero", "Convierta su sala en una discoteca...", 101582, 164011, "http://localhost:8080/uploads/mesa_de_centro_con_altavoz_reguetonero.jpg", "Muebles", true, 1, 3),
                new ProductData("Biblioteca con Compartimento Pa' Aguardiente", "Organice sus libros y sus placeres...", 85167, 166029, "http://localhost:8080/uploads/biblioteca_de_madera_con_compartimento_pa_aguardiente.jpg", "Muebles", false, 3, 5),
                new ProductData("Tensiómetro que Dice 'No se Estrese'", "¿La tensión alta lo tiene preocupado?...", 130542, 188313, "http://localhost:8080/uploads/tensiometro_que_dice_no_se_estrese.jpg", "Salud", false, 5, 9),
                new ProductData("Almohadilla Térmica con Aroma a Mentol", "Si le duele hasta el alma...", 128988, 187404, "http://localhost:8080/uploads/almohadilla_termica_con_aroma_a_mentol.jpg", "Salud", true, 0, 3),
                new ProductData("Pulsera Antiansiedad Reversible", "¿Siente que el mundo se le viene encima?...", 125547, 169508, "http://localhost:8080/uploads/pulsera_antiansiedad_reversible.jpg", "Salud", false, 10, 5),
                new ProductData("Nebulizador que Cuenta Chismes", "¿Aburrido de las nebulizaciones silenciosas?...", 140103, 196353, "http://localhost:8080/uploads/nebulizador_que_cuenta_chismes.jpg", "Salud", true, 9, 14),
                new ProductData("Camisa Antisudor con Refranes Populares", "Sude la gota gorda, pero con estilo...", 117133, 174639, "http://localhost:8080/uploads/camisa_antisudor_con_refranes_populares.jpg", "Ropa", true, 8, 5),
                new ProductData("Pantalón con Bolsillo pa' Todo", "¿Cansado de no tener dónde meter las llaves?...", 99338, 187247, "http://localhost:8080/uploads/pantalon_con_bolsillo_pa_todo.jpg", "Ropa", false, 7, 17),
                new ProductData("Chaqueta Reversible de Lluvia y Rumba", "¡Esté preparado para todo!...", 127422, 183184, "http://localhost:8080/uploads/chaqueta_reversible_de_lluvia_y_rumba.jpg", "Ropa", false, 10, 20),
                new ProductData("Medias de la Suerte Berriondas", "¿Quiere que todo le salga bien?...", 105104, 192174, "http://localhost:8080/uploads/medias_de_la_suerte_berriondas.jpg", "Ropa", true, 7, 5),
                new ProductData("Trapeador Inteligente con Voz de Abuela", "¿Le da pereza trapear?...", 155894, 183553, "http://localhost:8080/uploads/trapeador_inteligente_con_voz_de_abuela.jpg", "Aseo", true, 4, 16),
                new ProductData("Jabón Líquido Multitareas", "Este jabón es una berraquera, oiga...", 125177, 182461, "http://localhost:8080/uploads/jabon_liquido_multitareas.jpg", "Aseo", false, 6, 12),
                new ProductData("Escoba Antipereza", "¡Esta escoba barre hasta la mala suerte!...", 98687, 191528, "http://localhost:8080/uploads/escoba_antipereza.jpg", "Aseo", true, 10, 5),
                new ProductData("Ambientador con Olor a Empanada", "¿Quiere que su casa huela a gloria?...", 137923, 191663, "http://localhost:8080/uploads/ambientador_con_olor_a_empanada.jpg", "Aseo", true, 2, 13),
                new ProductData("Cuaderno de Apuntes Profundos", "¡Deje de escribir en servilletas!...", 130223, 165440, "http://localhost:8080/uploads/cuaderno_de_apuntes_profundos.jpg", "Papeleria", true, 6, 5),
                new ProductData("Esfero que No se Pierde (Mucho)", "Sabemos que los esferos tienen patas...", 127161, 166249, "http://localhost:8080/uploads/esfero_que_no_se_pierde_(mucho).jpg", "Papeleria", true, 5, 20),
                new ProductData("Resaltadores de la Verdad", "Con estos resaltadores, usted no subraya...", 137505, 164446, "http://localhost:8080/uploads/resaltadores_de_la_verdad.jpg", "Papeleria", true, 7, 7),
                new ProductData("Agenda con Refranes de Don Berriondo", "Organice su vida al mejor estilo paisa...", 112649, 189999, "http://localhost:8080/uploads/agenda_con_refranes_de_don_berriondo.jpg", "Papeleria", false, 3, 13),
                new ProductData("Muñeca Chismosa con Voz Paisa", "¡La compañera de juegos perfecta!...", 134733, 179531, "http://localhost:8080/uploads/muneca_chismosa_con_voz_paisa.jpg", "Jugueteria", true, 10, 6),
                new ProductData("Carrito Berriondo 4x4 Todo Terreno", "Este carrito es más verraco que un dolor de muela...", 102378, 174424, "http://localhost:8080/uploads/carrito_berriondo_4x4_todo_terreno.jpg", "Jugueteria", false, 1, 13),
                new ProductData("Set de Plastilina con Olor a Pandebono", "¡Deje que sus hijos amasen la creatividad!...", 126040, 192749, "http://localhost:8080/uploads/set_de_plastilina_con_olor_a_pandebono.jpg", "Jugueteria", false, 4, 18),
                new ProductData("Rompecabezas 3D de la Plaza de Mercado", "¡Arme un pedacito de nuestra tierra!...", 95990, 185493, "http://localhost:8080/uploads/rompecabezas_3d_de_la_plaza_de_mercado.jpg", "Jugueteria", true, 7, 11),
                new ProductData("Martillo Cantor de Golpes Precisos", "¿Aburrido de martillar en silencio?...", 120437, 165281, "http://localhost:8080/uploads/martillo_cantor_de_golpes_precisos.jpg", "Herramientas", true, 7, 15),
                new ProductData("Destornillador Multipropósito con Luz", "Este destornillador es la navaja suiza de los paisas...", 149431, 184172, "http://localhost:8080/uploads/destornillador_multiproposito_con_luz.jpg", "Herramientas", true, 1, 6),
                new ProductData("Cinta Métrica que Motiva", "¡Mida sus proyectos con optimismo!...", 99144, 177349, "http://localhost:8080/uploads/cinta_metrica_que_motiva.jpg", "Herramientas", true, 1, 11),
                new ProductData("Kit Pa’ Arreglar lo que su Ex Dañó", "¡No llore más, póngase a arreglar!...", 144804, 176058, "http://localhost:8080/uploads/kit_pa_arreglar_lo_que_su_ex_dano.jpg", "Herramientas", true, 2, 16),
                new ProductData("Olla a Presión Musical", "¿Le da miedo la olla a presión?...", 91765, 170137, "http://localhost:8080/uploads/olla_a_presion_musical.jpg", "Cocina", false, 5, 18),
                new ProductData("Cuchillo que No se Resbala", "¡Pique y repique con seguridad!...", 87689, 163341, "http://localhost:8080/uploads/cuchillo_que_no_se_resbala.jpg", "Cocina", false, 3, 12),
                new ProductData("Tabla de Picar con Medidor de Anécdotas", "Esta tabla no es solo pa' picar comida...", 120362, 190136, "http://localhost:8080/uploads/tabla_de_picar_con_medidor_de_anecdotas.jpg", "Cocina", true, 5, 13),
                new ProductData("Set de Cubiertos de la Suerte", "¿Quiere que su comida le caiga bien?...", 114450, 164612, "http://localhost:8080/uploads/set_de_cubiertos_de_la_suerte.jpg", "Cocina", true, 10, 0),
                new ProductData("Bombillo con Voz de Alarma", "Este bombillo no solo alumbra...", 103568, 184244, "http://localhost:8080/uploads/bombillo_con_voz_de_alarma.jpg", "Iluminacion", false, 4, 17),
                new ProductData("Lamparita de Noche con Luz de Fe", "Pa' los que le tienen miedo a la oscuridad...", 144165, 170724, "http://localhost:8080/uploads/lamparita_de_noche_con_luz_de_fe.jpg", "Iluminacion", false, 1, 17),
                new ProductData("Tira LED Berrionda RGB con Modo Parranda", "¡Convierta su cuarto en la mejor discoteca de Medellín!...", 147839, 193017, "http://localhost:8080/uploads/tira_led_berrionda_rgb_con_modo_parranda.jpg", "Iluminacion", false, 4, 15),
                new ProductData("Farol Solar con Canto de Gallo", "Póngale un toque campestre a su jardín...", 128341, 192242, "http://localhost:8080/uploads/farol_solar_con_canto_de_gallo.jpg", "Iluminacion", true, 3, 2),
                new ProductData("Comedero Antiderrame Pa’ Firulais", "¿Cansado de que Firulais le riegue la comida?...", 100209, 174910, "http://localhost:8080/uploads/comedero_antiderrame_pa_firulais.jpg", "Mascotas", false, 6, 13),
                new ProductData("Correa que Traduce Ladridos", "¿No entiende qué le quiere decir su perro?...", 150213, 198244, "http://localhost:8080/uploads/correa_que_traduce_ladridos.jpg", "Mascotas", true, 9, 1),
                new ProductData("Cama con Vibración Relajante", "Su mascota también merece un descanso de lujo...", 102484, 185507, "http://localhost:8080/uploads/cama_con_vibracion_relajante.jpg", "Mascotas", false, 0, 17),
                new ProductData("Set de Juguetes pa’ Peludos Berracos", "¡Entretenga a su mascota con los juguetes más verracos!...", 133438, 162628, "http://localhost:8080/uploads/set_de_juguetes_pa_peludos_berracos.jpg", "Mascotas", false, 7, 13)
        );
    }
}
