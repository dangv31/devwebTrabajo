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
                new ProductData("Celular Inteligente Berriondo Max 5000", "Este no es cualquier celular, este berriondo es un todoterreno digital...", 881000, 0, "./products/celular_inteligente_berriondo_max_5000.jpg", "Tecnologia", true, 5, 4),
                new ProductData("Audífonos Inalámbricos BerrinSound 360", "Estos audífonos berriondos le aíslan del mundo tanto que ni el vecino chismoso lo va a molestar...", 40000, 0, "./products/audifonos_inalambricos_berrinsound_360.jpg", "Tecnologia", true, 9, 7),
                new ProductData("Reloj Inteligente BerriTime 4G", "Mide pasos, mide el corazón, y hasta mide si lo están mirando mal...", 29000, 185000, "./products/reloj_inteligente_berritime_4g.jpg", "Tecnologia", false, 3, 15),
                new ProductData("Tablet ChiquiBerri 10.1 Wi-Fi", "Con esta tablet berrionda puede trabajar, estudiar, cocinar con recetas de TikTok y hasta ver novelas mientras barre...", 640000, 1910000, "./products/tablet_chiquiberri_10.1_wi-fi.jpg", "Tecnologia", false, 7, 3),
                new ProductData("Licuadora TurboChimba 3000", "¡Mire esta berraquera de licuadora! Pica hielo, pica chisme y hasta le pica el ojo si la mira feo...", 81000, 0, "./products/licuadora_turbochimba_3000.jpg", "Electrodomesticos", false, 8, 12),
                new ProductData("Nevera Antisantos XL", "¿Cansado de que se le dañe la comida? Con esta nevera Antisantos XL, sus alimentos duran más que un vallenato bueno...", 3170400, 0, "./products/nevera_antisantos_xl.jpg", "Electrodomesticos", true, 1, 1),
                new ProductData("Microondas con Espíritu Santo", "Este no es un microondas cualquiera, ¡este calienta con pura fe!...", 120000, 181000, "./products/microondas_con_espiritu_santo.jpg", "Electrodomesticos", true, 7, 12),
                new ProductData("Sanduchera Milagrosa 7 en 1", "¿Aburrido del pan con mantequilla? ¡Con esta sanduchera berrionda, usted hace milagros!...", 10000, 198000, "./products/sanduchera_milagrosa_7_en_1.jpg", "Electrodomesticos", true, 8, 17),
                new ProductData("Tostadora Inteligente 7B", "Esta no es cualquier tostadora, no señor, esta es la Tostadora Inteligente 7B...", 89900, 100000, "./products/tostadora_inteligente_7b.jpg", "Hogar", true, 5, 2),
                new ProductData("Almohada Antiestrés con Gritos Grabados", "¿El jefe lo tiene aburrido? ¿La suegra no lo deja en paz? ¡Pues grite, pero con estilo!...", 38000, 0, "./products/almohada_antiestres_con_gritos_grabados.jpg", "Hogar", false, 7, 0),
                new ProductData("Cobija Calentadora con Olor a Mamá", "¿Siente frío en el alma? ¡Arrópese con esta cobija y verá!...", 100000, 164000, "./products/cobija_calentadora_con_olor_a_mama.jpg", "Hogar", true, 4, 3),
                new ProductData("Silla Gamer Reclinable Intermunicipal 3000", "¡Mire esta belleza! Es silla pa'l vicio, pero también pa'l descanso...", 300000, 0, "./products/sillagamer.jpg", "Muebles", true, 2, 10),
                new ProductData("Tendedero Plegable Multinivel Berriondo", "¿No le cabe la ropa en el patio? ¡Con este tendedero, usted pone a secar hasta los calzones del vecino!...", 126400, 168000, "./products/tendedero_plegable_multinivel_berriondo.jpg", "Hogar", false, 7, 1),
                new ProductData("Cama Montañera XXL", "¡Ay, mi gente! ¡Esta no es cualquier cama, no señor! Esta es la Cama Montañera XXL...", 500000, 0, "./products/cama_montanera_xxl.jpg", "Hogar", true, -1, 20),
                new ProductData("Taza de café Chinchinense", "¡Parce, tómese el tinto con estilo! Esta taza no es de fábrica...", 30000, 50000, "./products/taza_de_cafe_chinchinense.jpg", "Hogar", false, 1, 50),
                new ProductData("Luces LED Caleñas", "¡Oiga, mire, vea! Póngale sabrosura a su casa con estas luces LED...", 70000, 0, "./products/luces_led_calenas.jpg", "Hogar", false, -5, 5),
                new ProductData("Cuadro del Divino Niño con LEDs", "Póngale fe y estilo a su casa con este Divino Niño que alumbra más que un poste de luz...", 97800, 167800, "./products/cuadro_del_divino_nino_con_leds.jpg", "Decoracion", false, 7, 8),
                new ProductData("Florero Antivuelco con Sensor de Chisme", "Decore su casa sin miedo a los regueros. Este florero es más estable que relación de abuelos...", 50000, 175600, "./products/florero_antivuelco_con_sensor_de_chisme.jpg", "Decoracion", true, 9, 14),
                new ProductData("Reloj de Pared que Da Consejo", "¿No sabe qué hacer con su vida? ¡Pregúntele a este reloj!...", 40000, 0, "./products/reloj_de_pared_que_da_consejo.jpg", "Decoracion", true, 8, 6),
                new ProductData("Adorno de Gallo que Canta el Himno", "¡Demuestre que es más colombiano que la arepa! Este gallo no es cualquier animal...", 39750, 0, "./products/adorno_de_gallo_que_canta_el_himno.jpg", "Decoracion", false, 0, 15),
                new ProductData("Sofá Reversible con Espacio pa' Sobrinos", "¿Le llegó visita y no sabe dónde meterla? ¡Tranquilo! Este sofá es la solución...", 100841, 179997, "./products/sofa_reversible_con_espacio_pa_sobrinos.jpg", "Muebles", false, 9, 7),
                new ProductData("Cama Nido con Cajón pa' Guardar Secretos", "Duerma como un rey y guarde sus tesoros como un pirata...", 88184, 194191, "./products/cama_nido_con_cajon_pa_guardar_secretos.jpg", "Muebles", true, 10, 8),
                new ProductData("Mesa de Centro con Altavoz Reguetonero", "Convierta su sala en una discoteca con esta mesa de centro...", 62429, 164011, "./products/mesa_de_centro_con_altavoz_reguetonero.jpg", "Muebles", true, 1, 3),
                new ProductData("Biblioteca con Compartimento Pa' Aguardiente", "Organice sus libros y sus placeres en un solo lugar...", 80862, 166029, "./products/biblioteca_de_madera_con_compartimento_pa_aguardiente.jpg", "Muebles", false, 3, 5),
                new ProductData("Tensiómetro que Dice 'No se Estrese'", "¿La tensión alta lo tiene preocupado? ¡Relájese!...", 57771, 188313, "./products/tensiometro_que_dice_no_se_estrese.jpg", "Salud", false, 5, 9),
                new ProductData("Almohadilla Térmica con Aroma a Mentol", "Si le duele hasta el alma, esta almohadilla es su salvación...", 128988, 187404, "./products/almohadilla_termica_con_aroma_a_mentol.jpg", "Salud", true, 0, 3),
                new ProductData("Pulsera Antiansiedad Reversible", "¿Siente que el mundo se le viene encima? ¡Póngase esta pulsera y verá!...", 43961, 169508, "./products/pulsera_antiansiedad_reversible.jpg", "Salud", false, 10, 5),
                new ProductData("Nebulizador que Cuenta Chismes", "¿Aburrido de las nebulizaciones silenciosas? ¡Este aparato le cambia la vida!...", 56250, 196353, "./products/nebulizador_que_cuenta_chismes.jpg", "Salud", true, 9, 14),
                new ProductData("Camisa Antisudor con Refranes Populares", "Sude la gota gorda, pero con estilo...", 57506, 174639, "./products/camisa_antisudor_con_refranes_populares.jpg", "Ropa", true, 8, 5),
                new ProductData("Pantalón con Bolsillo pa' Todo", "¿Cansado de no tener dónde meter las llaves, el celular, la billetera y el chocorramo?...", 87909, 187247, "./products/pantalon_con_bolsillo_pa_todo.jpg", "Ropa", false, 7, 17),
                new ProductData("Chaqueta Reversible de Lluvia y Rumba", "¡Esté preparado para todo! De un lado, esta chaqueta es impermeable...", 55762, 183184, "./products/chaqueta_reversible_de_lluvia_y_rumba.jpg", "Ropa", false, 10, 20),
                new ProductData("Medias de la Suerte Berriondas", "¿Quiere que todo le salga bien? ¡Empiece por los pies!...", 105104, 192174, "./products/medias_de_la_suerte_berriondas.jpg", "Ropa", true, 7, 5),
                new ProductData("Trapeador Inteligente con Voz de Abuela", "¿Le da pereza trapear? ¡Con este trapeador, la limpieza se vuelve un parche!...", 27659, 183553, "./products/trapeador_inteligente_con_voz_de_abuela.jpg", "Aseo", true, 4, 16),
                new ProductData("Jabón Líquido Multitareas", "Este jabón es una berraquera, oiga. Sirve pa' lavar la loza, la ropa, el perro y hasta el carro...", 57284, 182461, "./products/jabon_liquido_multitareas.jpg", "Aseo", false, 6, 12),
                new ProductData("Escoba Antipereza", "¡Esta escoba barre hasta la mala suerte!...", 92841, 191528, "./products/escoba_antipereza.jpg", "Aseo", true, 10, 5),
                new ProductData("Ambientador con Olor a Empanada", "¿Quiere que su casa huela a gloria? ¡Este ambientador es la respuesta!...", 53740, 191663, "./products/ambientador_con_olor_a_empanada.jpg", "Aseo", true, 2, 13),
                new ProductData("Cuaderno de Apuntes Profundos", "¡Deje de escribir en servilletas! En este cuaderno usted puede apuntar...", 130223, 165440, "./products/cuaderno_de_apuntes_profundos.jpg", "Papeleria", true, 6, 5),
                new ProductData("Esfero que No se Pierde (Mucho)", "Sabemos que los esferos tienen patas y se van. Pero este, ¡este es diferente!...", 39088, 166249, "./products/esfero_que_no_se_pierde_(mucho).jpg", "Papeleria", true, 5, 20),
                new ProductData("Resaltadores de la Verdad", "Con estos resaltadores, usted no subraya, ¡usted revela la verdad!...", 137505, 164446, "./products/resaltadores_de_la_verdad.jpg", "Papeleria", true, 7, 7),
                new ProductData("Agenda con Refranes de Don Berriondo", "Organice su vida al mejor estilo paisa...", 112649, 189999, "./products/agenda_con_refranes_de_don_berriondo.jpg", "Papeleria", false, 3, 13),
                new ProductData("Muñeca Chismosa con Voz Paisa", "¡La compañera de juegos perfecta! Esta muñeca no solo es bonita, ¡es una chismosa de primera!...", 44798, 179531, "./products/muneca_chismosa_con_voz_paisa.jpg", "Jugueteria", true, 10, 6),
                new ProductData("Carrito Berriondo 4x4 Todo Terreno", "Este carrito es más verraco que un dolor de muela...", 72046, 174424, "./products/carrito_berriondo_4x4_todo_terreno.jpg", "Jugueteria", false, 1, 13),
                new ProductData("Set de Plastilina con Olor a Pandebono", "¡Deje que sus hijos amasen la creatividad! Este set de plastilina no solo es suave y colorida...", 66709, 192749, "./products/set_de_plastilina_con_olor_a_pandebono.jpg", "Jugueteria", false, 4, 18),
                new ProductData("Rompecabezas 3D de la Plaza de Mercado", "¡Arme un pedacito de nuestra tierra! Con este rompecabezas...", 89503, 185493, "./products/rompecabezas_3d_de_la_plaza_de_mercado.jpg", "Jugueteria", true, 7, 11),
                new ProductData("Martillo Cantor de Golpes Precisos", "¿Aburrido de martillar en silencio? ¡Este martillo le pone ritmo a su trabajo!...", 44844, 165281, "./products/martillo_cantor_de_golpes_precisos.jpg", "Herramientas", true, 7, 15),
                new ProductData("Destornillador Multipropósito con Luz", "Este destornillador es la navaja suiza de los paisas...", 34741, 184172, "./products/destornillador_multiproposito_con_luz.jpg", "Herramientas", true, 1, 6),
                new ProductData("Cinta Métrica que Motiva", "¡Mida sus proyectos con optimismo! Esta cinta métrica no solo le da las medidas...", 78205, 177349, "./products/cinta_metrica_que_motiva.jpg", "Herramientas", true, 1, 11),
                new ProductData("Kit Pa’ Arreglar lo que su Ex Dañó", "¡No llore más, póngase a arreglar! Este kit tiene todo lo que necesita...", 31254, 176058, "./products/kit_pa_arreglar_lo_que_su_ex_dano.jpg", "Herramientas", true, 2, 16),
                new ProductData("Olla a Presión Musical", "¿Le da miedo la olla a presión? ¡Con esta se le quita!...", 91765, 170137, "./products/olla_a_presion_musical.jpg", "Cocina", false, 5, 18),
                new ProductData("Cuchillo que No se Resbala", "¡Pique y repique con seguridad! Este cuchillo tiene un mango que se le pega a la mano...", 87689, 163341, "./products/cuchillo_que_no_se_resbala.jpg", "Cocina", false, 3, 12),
                new ProductData("Tabla de Picar con Medidor de Anécdotas", "Esta tabla no es solo pa' picar comida, ¡es pa' contar historias!...", 69774, 190136, "./products/tabla_de_picar_con_medidor_de_anecdotas.jpg", "Cocina", true, 5, 13),
                new ProductData("Set de Cubiertos de la Suerte", "¿Quiere que su comida le caiga bien? ¡Use estos cubiertos!...", 114450, 164612, "./products/set_de_cubiertos_de_la_suerte.jpg", "Cocina", true, 10, 0),
                new ProductData("Bombillo con Voz de Alarma", "Este bombillo no solo alumbra, ¡cuida su casa!...", 103568, 184244, "./products/bombillo_con_voz_de_alarma.jpg", "Iluminacion", false, 4, 17),
                new ProductData("Lamparita de Noche con Luz de Fe", "Pa' los que le tienen miedo a la oscuridad... o al cucо...", 26559, 170724, "./products/lamparita_de_noche_con_luz_de_fe.jpg", "Iluminacion", false, 1, 17),
                new ProductData("Tira LED Berrionda RGB con Modo Parranda", "¡Convierta su cuarto en la mejor discoteca de Medellín!...", 147839, 193017, "./products/tira_led_berrionda_rgb_con_modo_parranda.jpg", "Iluminacion", false, 4, 15),
                new ProductData("Farol Solar con Canto de Gallo", "Póngale un toque campestre a su jardín...", 128341, 192242, "./products/farol_solar_con_canto_de_gallo.jpg", "Iluminacion", true, 3, 2),
                new ProductData("Comedero Antiderrame Pa’ Firulais", "¿Cansado de que Firulais le riegue la comida por toda la casa?...", 100209, 174910, "./products/comedero_antiderrame_pa_firulais.jpg", "Mascotas", false, 6, 13),
                new ProductData("Correa que Traduce Ladridos", "¿No entiende qué le quiere decir su perro? ¡Esta correa es su traductor personal!...", 48031, 198244, "./products/correa_que_traduce_ladridos.jpg", "Mascotas", true, 9, 1),
                new ProductData("Cama con Vibración Relajante", "Su mascota también merece un descanso de lujo...", 102484, 185507, "./products/cama_con_vibracion_relajante.jpg", "Mascotas", false, 0, 17),
                new ProductData("Set de Juguetes pa’ Peludos Berracos", "¡Entretenga a su mascota con los juguetes más verracos!...", 29190, 162628, "./products/set_de_juguetes_pa_peludos_berracos.jpg", "Mascotas", false, 7, 13)
        );
    }
}
