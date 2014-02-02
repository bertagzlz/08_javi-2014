
checkLoad();

function checkLoad() {
	if (document.getElementById('PG')) document.getElementById('loading').style.display = 'none';
	else setTimeout(checkLoad,500);
	}
