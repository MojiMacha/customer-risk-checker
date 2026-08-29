let currentUser = null;

function performSearch() {
    const db = getDatabase();
    const name = document.getElementById('search-input').value.trim();
    currentUser = db.find(u => u.name.toLowerCase() === name.toLowerCase());

    if (!currentUser) {
        alert("ไม่พบข้อมูลผู้รับรายนี้");
        document.getElementById('risk-result-card').classList.add('hidden');
        return;
    }

    renderCard();
    document.getElementById('risk-result-card').classList.remove('hidden');
}

function renderCard() {
    const risk = getRiskInfo(currentUser);
    
    document.getElementById('result-name').innerText = currentUser.name;
    document.getElementById('result-badge').innerText = risk.text;
    document.getElementById('result-badge').className = `px-4 py-1.5 rounded-full text-xs font-bold ${risk.bgClass}`;
    
    document.getElementById('result-total').innerText = `${currentUser.total} ชิ้น`;
    document.getElementById('result-success').innerText = `${currentUser.success} ชิ้น`;
    document.getElementById('result-failed').innerText = `${currentUser.failed} ชิ้น`;

    const percent = Math.round(currentUser.score * 100);
    document.getElementById('result-percent').innerText = `${percent}%`;
    document.getElementById('result-bar').style.width = `${percent}%`;
}

function record(type) {
    if (!currentUser) return;
    const db = getDatabase();
    const userInDb = db.find(u => u.name === currentUser.name);

    if (type === 'SUCCESS') userInDb.success += 1;
    if (type === 'FAILED') userInDb.failed += 1;

    saveDatabase(db); // บันทึกลง LocalStorage
    currentUser = userInDb;
    renderCard();
    alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
}
