document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // See More Buttons Logic (Popup Modal)
    const textModal = document.getElementById('text-modal');
    const textModalBody = document.getElementById('text-modal-body');
    const textModalClose = document.querySelector('.text-modal-close');
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');

    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            let moreText = this.parentElement.previousElementSibling;
            
            if (!moreText || !moreText.classList.contains('more-text')) {
                moreText = this.previousElementSibling;
            }

            if (moreText) {
                let excerpt = moreText.previousElementSibling;
                let modalContent = '';

                // Optionally grab headings from the parent section/content
                let h3 = moreText.parentElement.querySelector('h3');
                let h4 = moreText.parentElement.querySelector('h4');
                
                if (h3) modalContent += `<h3 style="color: var(--clr-purple); font-family: var(--font-heading); margin-bottom: 0.5rem; text-align: center;">${h3.innerText}</h3>`;
                if (h4) modalContent += `<h4 style="color: var(--clr-pink); font-family: var(--font-heading); margin-bottom: 1.5rem; text-align: center;">${h4.innerText}</h4>`;

                if (excerpt && excerpt.tagName === 'P') {
                    modalContent += `<p style="font-weight: 800; font-size: 1.2rem;">${excerpt.innerHTML}</p><hr style="border: 2px dashed var(--clr-pink); margin: 1.5rem 0;">`;
                }
                
                modalContent += moreText.innerHTML;

                if (textModalBody) {
                    textModalBody.innerHTML = modalContent;
                }
                
                if (textModal) {
                    textModal.style.display = 'flex';
                    textModal.style.justifyContent = 'center';
                    textModal.style.alignItems = 'center';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    if (textModal && textModalClose) {
        textModalClose.addEventListener('click', () => {
            textModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        textModal.addEventListener('click', (e) => {
            if (e.target === textModal) {
                textModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Dynamic Random Gallery Logic
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (galleryContainer) {
        // List of all 89 images from the Album folder
        const allImages = [
            "IMG_0102.JPG", "IMG_0103.JPG", "IMG_0104.JPG", "IMG_0105.JPG", "IMG_0106.JPG", "IMG_0107.JPG", "IMG_0108.JPG", "IMG_0109.JPG", "IMG_0111.JPG", "IMG_0112.JPG",
            "IMG_0113.JPG", "IMG_0114.JPG", "IMG_0115.JPG", "IMG_0116.JPG", "IMG_0117.JPG", "IMG_0118.JPG", "IMG_0119.JPG", "IMG_0120.JPG", "IMG_0121.JPG", "IMG_0122.JPG",
            "IMG_0123.JPG", "IMG_0124.JPG", "IMG_0125.JPG", "IMG_0126.JPG", "IMG_0127.JPG", "IMG_0128.JPG", "IMG_0129.JPG", "IMG_0130.JPG", "IMG_0131.JPG", "IMG_0132.JPG",
            "IMG_0133.JPG", "IMG_0134.JPG", "IMG_0135.JPG", "IMG_0136.JPG", "IMG_0137.JPG", "IMG_0138.JPG", "IMG_0139.JPG", "IMG_0140.JPG", "IMG_0149.JPG", "IMG_0201.JPG",
            "IMG_0202.JPG", "IMG_0203.JPG", "IMG_0204.JPG", "IMG_0205.JPG", "IMG_0206.JPG", "IMG_0207.JPG", "IMG_0208.JPG", "IMG_0209.JPG", "IMG_0210.JPG", "IMG_0211.JPG",
            "IMG_0877.JPG", "IMG_0878.JPG", "IMG_0879.JPG", "IMG_0880.JPG", "IMG_0881.JPG", "IMG_0882.JPG", "IMG_0883.JPG", "IMG_0958.JPG", "IMG_1124.JPG", "IMG_1125.JPG",
            "IMG_1126.JPG", "IMG_1127.JPG", "IMG_1128.JPG", "IMG_1252.JPG", "IMG_1588.JPG", "IMG_1596.JPG", "IMG_1605.JPG", "IMG_1686.JPG", "IMG_1690.JPG", "IMG_1717.JPG",
            "IMG_1722.JPG", "IMG_1725.JPG", "IMG_1727.JPG", "IMG_1765.JPG", "IMG_1773.JPG", "IMG_1819.JPG", "IMG_1840.JPG", "IMG_1842.JPG", "IMG_1843.JPG", "IMG_1849.JPG",
            "IMG_1857.JPG", "IMG_1858.JPG", "IMG_1917.JPG", "IMG_1927.JPG", "IMG_1957.JPG", "IMG_1962.JPG", "IMG_1964.JPG", "IMG_2171.JPG", "IMG_2247.JPG"
        ];

        // Shuffle array and pick 12 random images for a richer gallery
        const shuffled = allImages.sort(() => 0.5 - Math.random());
        const selectedImages = shuffled.slice(0, 12);

        // Generate HTML for the selected images
        selectedImages.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = `Album/${imgSrc}`;
            img.alt = `Dokumentasi ${index + 1}`;
            img.className = 'gallery-img';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            img.style.cursor = 'pointer'; // indicates it can be clicked
            
            item.appendChild(img);
            galleryContainer.appendChild(item);
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && galleryContainer) {
        // Event delegation for dynamically added images
        galleryContainer.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                lightbox.style.display = 'flex';
                lightbox.style.justifyContent = 'center';
                lightbox.style.alignItems = 'center';
                lightboxImg.src = e.target.src;
                document.body.style.overflow = 'hidden'; // prevent background scrolling
            }
        });

        // Close when X is clicked
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // =============================================
    // COMMENT & REPLY SYSTEM
    // =============================================
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const COLORS = ['var(--clr-cyan)', 'var(--clr-yellow)', 'var(--clr-pink)', 'var(--clr-purple)'];
    const STORAGE_KEY = 'angonbocah_comments_v2';

    // Default seed comments
    const defaultComments = [
        { id: 'c1', name: 'Siti Rahma', message: 'Wah acaranya seru banget! Anak-anak pasti suka! Nggak sabar nunggu hari H nya.', color: 'var(--clr-cyan)', time: Date.now() - 86400000, replies: [] },
        { id: 'c2', name: 'Budi Santoso', message: 'Tahun lalu saya ke Pasar Wutah, jajanannya enak-enak dan harganya terjangkau. Recommended buat keluarga!', color: 'var(--clr-pink)', time: Date.now() - 43200000, replies: [] }
    ];

    function loadComments() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : defaultComments;
        } catch(e) { return defaultComments; }
    }

    function saveComments(comments) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(comments)); } catch(e) {}
    }

    function formatTime(ts) {
        const d = new Date(ts);
        return d.toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' }) + ' ' +
               d.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
    }

    function createReplyHTML(reply) {
        return `
        <div class="reply-card" style="border-left-color:${reply.color}">
            <div class="reply-header">
                <span class="reply-avatar" style="background:${reply.color}">${reply.name.charAt(0).toUpperCase()}</span>
                <strong>${reply.name}</strong>
                <span class="comment-time">${formatTime(reply.time)}</span>
            </div>
            <p>${reply.message}</p>
        </div>`;
    }

    function createCommentEl(c, allComments) {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment-card bounce-in';
        commentEl.style.borderColor = c.color;
        commentEl.style.boxShadow = `6px 6px 0 ${c.color}`;
        commentEl.dataset.id = c.id;

        const repliesHTML = (c.replies || []).map(r => createReplyHTML(r)).join('');

        commentEl.innerHTML = `
            <div class="comment-header">
                <span class="comment-avatar" style="background:${c.color}">${c.name.charAt(0).toUpperCase()}</span>
                <div>
                    <h4 style="margin:0;">${c.name}</h4>
                    <span class="comment-time">${formatTime(c.time)}</span>
                </div>
            </div>
            <p class="comment-body">${c.message}</p>
            <div class="comment-actions">
                <button class="reply-btn" data-id="${c.id}">💬 Balas</button>
            </div>
            <div class="reply-form-wrap" id="reply-form-${c.id}" style="display:none;">
                <div class="reply-input-row">
                    <input type="text" class="reply-name-input" placeholder="Nama kamu..." maxlength="40" required>
                    <textarea class="reply-msg-input" placeholder="Tulis balasan..." rows="2" required></textarea>
                    <div class="reply-btns">
                        <button class="btn-send-reply" data-id="${c.id}">Kirim ✈️</button>
                        <button class="btn-cancel-reply" data-id="${c.id}">Batal</button>
                    </div>
                </div>
            </div>
            <div class="replies-list">${repliesHTML}</div>
        `;
        return commentEl;
    }

    function renderComments(comments) {
        if (!commentsList) return;
        commentsList.innerHTML = '';
        comments.forEach(c => {
            commentsList.appendChild(createCommentEl(c, comments));
        });
        bindCommentEvents(comments);
    }

    function bindCommentEvents(comments) {
        // Reply toggle
        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const form = document.getElementById(`reply-form-${id}`);
                if (form) {
                    const isOpen = form.style.display !== 'none';
                    form.style.display = isOpen ? 'none' : 'block';
                    btn.textContent = isOpen ? '💬 Balas' : '✕ Tutup';
                    if (!isOpen) form.querySelector('.reply-name-input').focus();
                }
            });
        });

        // Cancel reply
        document.querySelectorAll('.btn-cancel-reply').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const form = document.getElementById(`reply-form-${id}`);
                if (form) form.style.display = 'none';
                const replyBtn = document.querySelector(`.reply-btn[data-id="${id}"]`);
                if (replyBtn) replyBtn.textContent = '💬 Balas';
            });
        });

        // Send reply
        document.querySelectorAll('.btn-send-reply').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const form = document.getElementById(`reply-form-${id}`);
                const nameEl = form.querySelector('.reply-name-input');
                const msgEl = form.querySelector('.reply-msg-input');
                const name = nameEl.value.trim();
                const msg = msgEl.value.trim();
                if (!name || !msg) { alert('Isi nama dan balasan dulu ya! 😊'); return; }

                const reply = {
                    id: 'r' + Date.now(),
                    name,
                    message: msg,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    time: Date.now()
                };

                const parent = comments.find(c => c.id === id);
                if (parent) {
                    parent.replies = parent.replies || [];
                    parent.replies.push(reply);
                    saveComments(comments);

                    const repliesList = document.querySelector(`.comment-card[data-id="${id}"] .replies-list`);
                    if (repliesList) {
                        const replyEl = document.createElement('div');
                        replyEl.innerHTML = createReplyHTML(reply);
                        repliesList.appendChild(replyEl.firstElementChild);
                    }

                    nameEl.value = '';
                    msgEl.value = '';
                    form.style.display = 'none';
                    const replyBtn = document.querySelector(`.reply-btn[data-id="${id}"]`);
                    if (replyBtn) replyBtn.textContent = '💬 Balas';
                }
            });
        });
    }

    if (commentForm && commentsList) {
        let comments = loadComments();
        renderComments(comments);

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = commentForm.querySelector('input');
            const messageInput = commentForm.querySelector('textarea');
            const name = nameInput.value.trim();
            const message = messageInput.value.trim();

            if (name && message) {
                const newComment = {
                    id: 'c' + Date.now(),
                    name,
                    message,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    time: Date.now(),
                    replies: []
                };

                comments.unshift(newComment);
                saveComments(comments);

                const commentEl = createCommentEl(newComment, comments);
                commentsList.prepend(commentEl);
                bindCommentEvents(comments);

                nameInput.value = '';
                messageInput.value = '';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if(target) {
                // Close mobile menu if open
                if(navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Calculate position accurately
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ScrollSpy: Highlight nav links on scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - navbarHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active-nav');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active-nav');
            }
        });
    });

    // =============================================
    // CONFETTI PARTICLES in Hero
    // =============================================
    const confettiContainer = document.getElementById('confetti-container');
    if (confettiContainer) {
        const confettiEmojis = ['🎈','🎉','🌟','✨','🎊','⭐','🎀','🎁','🌈','💫','🎆','🎇'];
        for (let i = 0; i < 18; i++) {
            const piece = document.createElement('span');
            piece.className = 'confetti-piece';
            piece.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            piece.style.left = Math.random() * 100 + '%';
            piece.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
            const dur = 5 + Math.random() * 8;
            piece.style.animationDuration = dur + 's';
            piece.style.animationDelay = -(Math.random() * dur) + 's'; // start mid-fall
            confettiContainer.appendChild(piece);
        }
    }

    // =============================================
    // GAME 1: Tangkap Balon! (Balloon Pop)
    // =============================================
    const startBalloonBtn = document.getElementById('start-balloon');
    const balloonArena    = document.getElementById('balloon-arena');
    const balloonScoreEl  = document.getElementById('balloon-score');
    const balloonTimerEl  = document.getElementById('balloon-timer');
    const balloonResult   = document.getElementById('balloon-result');
    const balloonFinalEl  = document.getElementById('balloon-final');

    if (startBalloonBtn && balloonArena) {
        const balloonEmojis = ['🎈','🎀','🎁','🎊','🌟','💛','💜','💙','❤️','🧡'];
        let balloonScore = 0;
        let balloonTime  = 30;
        let balloonGameActive = false;
        let balloonInterval  = null;
        let spawnInterval    = null;
        let allBalloons      = [];

        function spawnBalloon() {
            if (!balloonGameActive) return;
            const balloon = document.createElement('span');
            balloon.className = 'balloon';
            balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            const leftPct = 5 + Math.random() * 85;
            balloon.style.left = leftPct + '%';
            const speed = 4 + Math.random() * 5; // seconds to rise
            balloon.style.animationDuration = speed + 's';
            balloon.style.fontSize = (2 + Math.random() * 1.2) + 'rem';

            balloon.addEventListener('click', () => {
                if (!balloonGameActive) return;
                balloon.classList.add('pop');
                balloonScore++;
                balloonScoreEl.textContent = balloonScore;
                // Floating +1 text
                const plus = document.createElement('span');
                plus.textContent = '+1';
                plus.style.cssText = `position:absolute;left:${leftPct}%;bottom:40%;color:#FDDA44;font-family:var(--font-heading);font-size:1.5rem;pointer-events:none;animation:confettiFall 0.8s ease-out forwards;`;
                balloonArena.appendChild(plus);
                setTimeout(() => plus.remove(), 800);
                setTimeout(() => balloon.remove(), 300);
            });

            // Auto-remove when out of view
            balloon.addEventListener('animationend', () => balloon.remove());

            balloonArena.appendChild(balloon);
        }

        function endBalloonGame() {
            balloonGameActive = false;
            clearInterval(balloonInterval);
            clearInterval(spawnInterval);
            // Remove all active balloons
            balloonArena.querySelectorAll('.balloon').forEach(b => b.remove());
            balloonFinalEl.textContent = balloonScore;
            balloonResult.style.display = 'block';
            startBalloonBtn.textContent = '🔄 Main Lagi!';
        }

        function startBalloonGame() {
            // Reset
            balloonScore = 0;
            balloonTime  = 30;
            balloonScoreEl.textContent = '0';
            balloonTimerEl.textContent = '30';
            balloonResult.style.display = 'none';
            balloonArena.querySelectorAll('.balloon').forEach(b => b.remove());
            balloonGameActive = true;
            startBalloonBtn.textContent = '⏸ Sedang Bermain...';
            startBalloonBtn.disabled = true;

            // Spawn balloons every 700ms
            spawnInterval = setInterval(spawnBalloon, 700);

            // Countdown timer
            balloonInterval = setInterval(() => {
                balloonTime--;
                balloonTimerEl.textContent = balloonTime;
                if (balloonTime <= 0) {
                    endBalloonGame();
                    startBalloonBtn.disabled = false;
                }
            }, 1000);
        }

        startBalloonBtn.addEventListener('click', startBalloonGame);
    }

    // =============================================
    // GAME 2: Tebak Dolanan! (Traditional Game Quiz)
    // =============================================
    const quizQuestionEl  = document.getElementById('quiz-question');
    const quizHintEl      = document.getElementById('quiz-hint');
    const quizOptionsEl   = document.getElementById('quiz-options');
    const quizFeedbackEl  = document.getElementById('quiz-feedback');
    const quizQNumEl      = document.getElementById('quiz-q-num');
    const quizScoreEl     = document.getElementById('quiz-score');
    const quizResultBox   = document.getElementById('quiz-result');
    const quizBox         = document.getElementById('quiz-box');
    const quizProgressEl  = document.getElementById('quiz-progress');
    const quizFinalScore  = document.getElementById('quiz-final-score');
    const quizResultEmoji = document.getElementById('quiz-result-emoji');
    const quizResultMsg   = document.getElementById('quiz-result-msg');
    const restartQuizBtn  = document.getElementById('restart-quiz');

    if (quizBox && restartQuizBtn) {
        const quizData = [
            {
                emoji: '🪀🧵',
                hint: 'Permainan melempar & menggulung tali…',
                answer: 'Gasing',
                options: ['Gasing', 'Egrang', 'Dakon', 'Kelereng']
            },
            {
                emoji: '🦶🪵🪵',
                hint: 'Berjalan di atas dua bambu panjang…',
                answer: 'Egrang',
                options: ['Bakiak', 'Egrang', 'Benthik', 'Othok-othok']
            },
            {
                emoji: '🪨🕳️🕳️🕳️',
                hint: 'Memindahkan biji ke dalam lubang…',
                answer: 'Dakon',
                options: ['Dakon', 'Congklak', 'Kelereng', 'Gasing']
            },
            {
                emoji: '🤸‍♂️🧶',
                hint: 'Melompat melewati untaian karet gelang…',
                answer: 'Lompat Tali',
                options: ['Engklek', 'Lompat Tali', 'Benthik', 'Yeye']
            },
            {
                emoji: '👡👡👡',
                hint: 'Tiga orang berbagi dua alas kaki kayu…',
                answer: 'Bakiak',
                options: ['Egrang', 'Engklek', 'Bakiak', 'Dakon']
            },
            {
                emoji: '⬜🦶🦵',
                hint: 'Melompat satu kaki di kotak-kotak…',
                answer: 'Engklek',
                options: ['Engklek', 'Lompat Tali', 'Gasing', 'Bakiak']
            },
            {
                emoji: '⚪🎯',
                hint: 'Memukul bola kecil dari tanah…',
                answer: 'Kelereng',
                options: ['Dakon', 'Gasing', 'Kelereng', 'Benthik']
            }
        ];

        let currentQ = 0;
        let quizScore = 0;
        let answered  = false;

        function loadQuestion(index) {
            answered = false;
            const q = quizData[index];
            quizQuestionEl.textContent = q.emoji;
            quizHintEl.textContent     = q.hint;
            quizQNumEl.textContent     = index + 1;
            quizFeedbackEl.textContent = '';
            quizFeedbackEl.style.color = 'white';

            // Shuffle options
            const shuffled = [...q.options].sort(() => 0.5 - Math.random());
            quizOptionsEl.innerHTML = '';
            shuffled.forEach(opt => {
                const btn = document.createElement('button');
                btn.className   = 'quiz-opt';
                btn.textContent = opt;
                btn.addEventListener('click', () => handleAnswer(btn, opt, q.answer));
                quizOptionsEl.appendChild(btn);
            });
        }

        function handleAnswer(btn, selected, correct) {
            if (answered) return;
            answered = true;

            const allOpts = quizOptionsEl.querySelectorAll('.quiz-opt');
            allOpts.forEach(b => {
                b.disabled = true;
                if (b.textContent === correct) b.classList.add('correct');
            });

            if (selected === correct) {
                quizScore++;
                quizScoreEl.textContent = quizScore;
                quizFeedbackEl.textContent = '✅ Benar! Kamu hebat!';
                quizFeedbackEl.style.color = '#2ecc71';
            } else {
                btn.classList.add('wrong');
                quizFeedbackEl.textContent = `❌ Salah! Jawabannya: ${correct}`;
                quizFeedbackEl.style.color = '#e74c3c';
            }

            // Auto-advance after 1.5s
            setTimeout(() => {
                currentQ++;
                if (currentQ < quizData.length) {
                    loadQuestion(currentQ);
                } else {
                    showQuizResult();
                }
            }, 1500);
        }

        function showQuizResult() {
            quizBox.style.display      = 'none';
            quizProgressEl.style.display = 'none';
            quizResultBox.style.display = 'block';
            quizFinalScore.textContent  = quizScore;

            const pct = quizScore / quizData.length;
            if (pct === 1) {
                quizResultEmoji.textContent = '🏆';
                quizResultMsg.textContent   = 'Sempurna! Kamu maestro dolanan tradisional!';
            } else if (pct >= 0.7) {
                quizResultEmoji.textContent = '🌟';
                quizResultMsg.textContent   = 'Bagus sekali! Kamu tahu banyak tentang dolanan!';
            } else if (pct >= 0.4) {
                quizResultEmoji.textContent = '🎈';
                quizResultMsg.textContent   = 'Lumayan! Coba lagi buat skor lebih tinggi!';
            } else {
                quizResultEmoji.textContent = '🤔';
                quizResultMsg.textContent   = 'Yuk belajar lagi tentang permainan tradisional!';
            }
        }

        function restartQuiz() {
            currentQ  = 0;
            quizScore = 0;
            quizScoreEl.textContent      = '0';
            quizResultBox.style.display  = 'none';
            quizBox.style.display        = 'block';
            quizProgressEl.style.display = 'flex';
            loadQuestion(0);
        }

        restartQuizBtn.addEventListener('click', restartQuiz);

        // Initialize on load
        loadQuestion(0);
    }

    // =============================================
    // LOADER / SPLASH SCREEN
    // =============================================
    const loader = document.getElementById('loader');
    if (loader) {
        // Hide after fonts + images settle
        setTimeout(() => loader.classList.add('hidden'), 1800);
    }

    // =============================================
    // SCROLL PROGRESS BAR
    // =============================================
    const scrollBar = document.getElementById('scroll-progress-bar');
    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            scrollBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
        }, { passive: true });
    }

    // =============================================
    // NAVBAR SHRINK ON SCROLL
    // =============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 80);
        }, { passive: true });
    }

    // =============================================
    // SCROLL REVEAL — IntersectionObserver
    // =============================================
    // Programmatically apply reveal classes
    document.querySelectorAll('section h2').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.card').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.game-card').forEach((el, i) => {
        el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    });
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 3 * 0.12) + 's';
    });
    document.querySelectorAll('.sponsor-logo').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * 0.1) + 's';
    });
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4 * 0.1) + 's';
    });
    // Split layout — text from left, image from right
    const splitText = document.querySelector('.content-text');
    const splitImg  = document.querySelector('.content-img');
    if (splitText) splitText.classList.add('reveal-left');
    if (splitImg)  splitImg.classList.add('reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // =============================================
    // LIVE COUNTDOWN TIMER
    // =============================================
    const cdDays  = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins  = document.getElementById('cd-mins');
    const cdSecs  = document.getElementById('cd-secs');

    function updateCountdown() {
        const festivalDate = new Date('2026-07-25T08:00:00+07:00');
        const diff = festivalDate - new Date();
        const pad  = n => String(Math.max(0, n)).padStart(2, '0');

        if (diff <= 0) {
            if (cdDays)  cdDays.textContent  = '00';
            if (cdHours) cdHours.textContent = '00';
            if (cdMins)  cdMins.textContent  = '00';
            if (cdSecs)  cdSecs.textContent  = '🎉';
            return;
        }

        if (cdDays)  cdDays.textContent  = pad(Math.floor(diff / 86400000));
        if (cdHours) cdHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
        if (cdMins)  cdMins.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
        if (cdSecs)  cdSecs.textContent  = pad(Math.floor((diff % 60000)    / 1000));
    }

    if (cdDays) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // =============================================
    // BACK TO TOP BUTTON
    // =============================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // TYPEWRITER EFFECT — Hero Subtitle
    // =============================================
    const subtitleEl = document.querySelector('.hero .subtitle');
    if (subtitleEl) {
        const fullText = subtitleEl.textContent.trim();
        subtitleEl.textContent = '';
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        subtitleEl.appendChild(cursor);

        let i = 0;
        function typeNext() {
            if (i < fullText.length) {
                subtitleEl.insertBefore(document.createTextNode(fullText[i]), cursor);
                i++;
                setTimeout(typeNext, 85);
            }
        }
        // Start typing after loader fades (~2s)
        setTimeout(typeNext, 2000);
    }
});

