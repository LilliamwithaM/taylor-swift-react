import firebase from "../firebase";

const db = firebase.collection("/debut");

export default new class TaylorDataService {
    getAll() {
        return db;
    }

    create(taylor) {
        return db.add(taylor);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}
