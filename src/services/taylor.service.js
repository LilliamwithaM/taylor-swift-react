import firebase from "../firebase";

const db = firebase.collection("/debut");

class TaylorDataService {
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

const taylor = new TaylorDataService();
export default taylor;