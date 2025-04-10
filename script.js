// Configuração do ScrollReveal
ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 1000,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    mobile: true
});

// Animação para elementos do cabeçalho
ScrollReveal().reveal('.esquerda-conteudo h1', {
    origin: 'left',
    delay: 300
});

ScrollReveal().reveal('.esquerda-conteudo p, .esquerda-conteudo a', {
    origin: 'left',
    delay: 500,
    interval: 200
});

ScrollReveal().reveal('.img-inicio', {
    origin: 'right',
    delay: 700
});

// Animação para seção "O que é"
ScrollReveal().reveal('.col-md-4 img', {
    origin: 'bottom',
    delay: 300
});

ScrollReveal().reveal('.col-md-8 h2', {
    origin: 'left',
    delay: 400
});

ScrollReveal().reveal('.col-md-8 p', {
    origin: 'left',
    delay: 500,
    interval: 200
});

// Animação para a galeria
ScrollReveal().reveal('#galeria h2, #galeria p', {
    origin: 'top',
    delay: 300
});

ScrollReveal().reveal('.galeria-img', {
    origin: 'bottom',
    delay: 400,
    interval: 200
});

// Efeitos especiais
ScrollReveal().reveal('.menu-acessibilidade', {
    rotate: {
        x: 20,
        z: 20
    },
    delay: 1000
});

ScrollReveal().reveal('footer', {
    scale: 0.85,
    delay: 300
});

// Configurações responsivas
function setupScrollReveal() {
    if (window.innerWidth > 768) {
        ScrollReveal().reveal('.img-inicio', {
            origin: 'right',
            distance: '150px',
            delay: 700
        });
    } else {
        ScrollReveal().reveal('.img-inicio', {
            origin: 'bottom',
            distance: '60px',
            delay: 500
        });
    }
}

// Inicializar e configurar para o tamanho atual
setupScrollReveal();

// Atualizar ao redimensionar
window.addEventListener('resize', function() {
    ScrollReveal().sync();
    setupScrollReveal();
});

// Controle do menu de acessibilidade
const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');

botaoAcessibilidade.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    opcoesAcessibilidade.classList.toggle('mostrar-opcoes');
    
    // Rotacionar o ícone
    this.classList.toggle('rotacionado');
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    if (!botaoAcessibilidade.contains(event.target) && !opcoesAcessibilidade.contains(event.target)) {
        botaoAcessibilidade.setAttribute('aria-expanded', 'false');
        opcoesAcessibilidade.classList.remove('mostrar-opcoes');
    }
});

// Controle de tamanho de fonte
document.getElementById('aumentar-fonte').addEventListener('click', function() {
    alterarTamanhoFonte(1);
});

document.getElementById('diminuir-fonte').addEventListener('click', function() {
    alterarTamanhoFonte(-1);
});

function alterarTamanhoFonte(direcao) {
    const html = document.documentElement;
    let tamanhoAtual = parseFloat(getComputedStyle(html).fontSize);
    const novoValor = tamanhoAtual + (direcao * 2);
   
    // Limites mínimo e máximo
    if (novoValor >= 12 && novoValor <= 24) {
        html.style.fontSize = novoValor + 'px';
        localStorage.setItem('tamanhoFonte', novoValor);
        
        // Feedback visual
        const feedback = document.createElement('div');
        feedback.textContent = direcao > 0 ? 'Tamanho da fonte aumentado' : 'Tamanho da fonte diminuído';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.backgroundColor = 'rgba(0,0,0,0.7)';
        feedback.style.color = 'white';
        feedback.style.padding = '10px 20px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '1000';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
}

// Controle de alto contraste
document.getElementById('alterna-contraste').addEventListener('click', function() {
    document.body.classList.toggle('alto-contraste');
   
    // Salvar preferência
    if (document.body.classList.contains('alto-contraste')) {
        localStorage.setItem('altoContraste', 'ativo');
    } else {
        localStorage.setItem('altoContraste', 'inativo');
    }
    
    // Feedback visual
    const feedback = document.createElement('div');
    feedback.textContent = document.body.classList.contains('alto-contraste') ? 
        'Modo alto contraste ativado' : 'Modo alto contraste desativado';
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.backgroundColor = 'rgba(0,0,0,0.7)';
    feedback.style.color = 'white';
    feedback.style.padding = '10px 20px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '1000';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Adicionar classe de destaque temporário
            if (targetId !== '#inicio') {
                targetElement.classList.add('destaque-temporario');
                setTimeout(() => {
                    targetElement.classList.remove('destaque-temporario');
                }, 2000);
            }
        }
    });
});

// Efeito ripple nos botões
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        // Remover efeitos anteriores
        const ripples = this.getElementsByClassName('ripple-effect');
        while (ripples[0]) {
            ripples[0].remove();
        }
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
       
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
       
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
       
        this.appendChild(ripple);
       
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Carregar preferências salvas
window.addEventListener('DOMContentLoaded', () => {
    // Tamanho da fonte
    if (localStorage.getItem('tamanhoFonte')) {
        document.documentElement.style.fontSize = localStorage.getItem('tamanhoFonte') + 'px';
    }
   
    // Alto contraste
    if (localStorage.getItem('altoContraste') === 'ativo') {
        document.body.classList.add('alto-contraste');
    }
   
    // Animação de carregamento para imagens
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.classList.add('img-loading');
        }
        img.addEventListener('load', () => {
            img.classList.remove('img-loading');
        });
    });
});

// Melhorar navegação por teclado
document.addEventListener('keydown', function(e) {
    // Fechar menu de acessibilidade com ESC
    if (e.key === 'Escape' && opcoesAcessibilidade.classList.contains('mostrar-opcoes')) {
        botaoAcessibilidade.click();
        botaoAcessibilidade.focus();
    }
    
    // Navegação por teclado no menu de acessibilidade
    if (opcoesAcessibilidade.classList.contains('mostrar-opcoes')) {
        const botoes = Array.from(opcoesAcessibilidade.querySelectorAll('button'));
        const currentIndex = botoes.indexOf(document.activeElement);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % botoes.length;
            botoes[nextIndex].focus();
        }
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + botoes.length) % botoes.length;
            botoes[prevIndex].focus();
        }
        
        if (e.key === 'Home') {
            e.preventDefault();
            botoes[0].focus();
        }
        
        if (e.key === 'End') {
            e.preventDefault();
            botoes[botoes.length - 1].focus();
        }
    }
});

// Adicionar classe quando a página é rolada
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        document.body.classList.add('pagina-rolada');
    } else {
        document.body.classList.remove('pagina-rolada');
    }
});