// ข้อมูลเริ่มต้น
const INITIAL_DB = [
    { name: "ธณกร", total: 52, failed: 27, success: 25, score: 0.52, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "นรินทร์", total: 75, failed: 16, success: 59, score: 0.21, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พรเมธี", total: 35, failed: 23, success: 12, score: 0.66, isBlacklisted: true, blacklistReason: "ปฏิเสธชำระเงิน COD", logs: [] }
];

// ดึงข้อมูลจาก LocalStorage
function getDatabase() {
    const data = localStorage.getItem('delivery_app_db');
    if (!data) {
        localStorage.setItem('delivery_app_db', JSON.stringify(INITIAL_DB));
        return INITIAL_DB;
    }
    return JSON.parse(data);
}

// บันทึกข้อมูลลง LocalStorage
function saveDatabase(db) {
    localStorage.setItem('delivery_app_db', JSON.stringify(db));
}

// คำนวณความเสี่ยง
function getRiskInfo(user) {
    user.total = user.success + user.failed;
    user.score = user.total > 0 ? parseFloat((user.failed / user.total).toFixed(2)) : 0;

    if (user.isBlacklisted || user.score >= 0.4) {
        return { level: 'HIGH', text: '🔴 ความเสี่ยงสูง (High Risk)', bgClass: 'bg-rose-600 text-white' };
    }
    if (user.score >= 0.2) {
        return { level: 'MEDIUM', text: '🟡 ความเสี่ยงปานกลาง (Medium Risk)', bgClass: 'bg-amber-500 text-white' };
    }
    return { level: 'LOW', text: '🟢 ความเสี่ยงต่ำ (Low Risk)', bgClass: 'bg-emerald-600 text-white' };
}
