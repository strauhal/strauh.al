<script>
    var sites = [
        'http://www.google.com',
        'http://www.stackoverflow.com',
        'http://www.example.com',
        'http://www.youtube.com'
    ];

    function randomSite() {
        var i = parseInt(Math.random() * sites.length);
        location.href = sites[i];
    }
</script>
<a href="#" onclick="randomSite();">Random</a>
