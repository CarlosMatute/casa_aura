document.addEventListener('DOMContentLoaded', () => {
    // --- Menú Móvil ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono del menu (hamburguesa / equis)
            const isActive = navMenu.classList.contains('active');
            menuToggle.innerHTML = isActive 
                ? `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                : `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    // --- Filtro Dinámico de Guía Local ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const guideCards = document.querySelectorAll('.guide-card');

    if (tabButtons.length > 0 && guideCards.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Quitar clase activa de todos los botones
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase activa al botón presionado
                button.classList.add('active');

                const targetCategory = button.getAttribute('data-target');

                guideCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (targetCategory === 'all' || cardCategory === targetCategory) {
                        card.style.display = 'block';
                        // Re-activar animación de entrada
                        card.style.animation = 'none';
                        card.offsetHeight; /* trigger reflow */
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Feedback del Formulario de Contacto ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                
                // Mostrar alerta de éxito
                let feedback = contactForm.querySelector('.form-feedback');
                if (!feedback) {
                    feedback = document.createElement('div');
                    feedback.className = 'form-feedback';
                    feedback.style.marginTop = '15px';
                    feedback.style.padding = '12px';
                    feedback.style.borderRadius = '4px';
                    feedback.style.backgroundColor = 'rgba(13, 77, 79, 0.1)';
                    feedback.style.color = 'var(--primary-color)';
                    feedback.style.fontSize = '0.9rem';
                    feedback.style.fontWeight = '500';
                    feedback.style.textAlign = 'center';
                    feedback.style.border = '1px solid var(--primary-color)';
                    contactForm.appendChild(feedback);
                }
                feedback.textContent = '¡Muchas gracias! Tu consulta ha sido enviada con éxito. Nos comunicaremos contigo a la brevedad.';
                feedback.style.display = 'block';

                contactForm.reset();

                // Restaurar botón después de unos segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
});
