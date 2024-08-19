// common.js
function loadHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            if (id === 'header') {
                initializeVueApp(); // 헤더 로드 후 Vue 초기화
            }
        });
}

function initializeVueApp() {
    const app = Vue.createApp({
        data() {
            return {
                isLoggedIn: false,  // 로그인 상태 관리
                isAdmin: false      // 관리자 상태 관리
            };
        },
        mounted() {
            this.checkLoginStatus(); // 페이지 로드 시 로그인 상태 확인
        },
        methods: {
            checkLoginStatus() {
                this.isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
                const userRole = sessionStorage.getItem("userRole");
                this.isAdmin = userRole === "admin001"; // 사용자가 관리자일 경우 true로 설정
            },
            logout() {
                $.ajax({
                    url: "http://localhost:3000/logout",
                    type: "GET",
                    success: () => {
                        this.isLoggedIn = false;
                        this.isAdmin = false;  // 로그아웃 시 관리자 상태 초기화
                        sessionStorage.removeItem("isLoggedIn");
                        sessionStorage.removeItem("userRole");  // 역할 정보도 제거
                        alert("로그아웃되었습니다.");
                        window.location.href = "login.html";
                    },
                    error: (error) => {
                        console.error('Error:', error);
                    }
                });
            }
        }
    });

    app.mount('#header');
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', 'header.html'); // 헤더 로드
    loadHTML('footer', 'footer.html'); // 필요에 따라 추가
});