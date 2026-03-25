(function() {
    const token = localStorage.getItem('token');

    if (!token) {

        window.location.href = "/login";
        return;
    }


})();

function logout() {
    localStorage.removeItem('token');
    window.location.href = "/login";
}