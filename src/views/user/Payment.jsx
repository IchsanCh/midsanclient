import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Payment() {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:1031/api/payments");
      setPayments(res.data);
    } catch (error) {
      console.error("Gagal fetch data pembayaran", error);
    }
  };

  const retryForward = async (id) => {
    try {
      await axios.post(`http://localhost:1031/api/payments/${id}/retry`);
      alert("Forward ulang berhasil!");
      fetchPayments();
    } catch (error) {
      alert("Gagal retry");
    }
  };

  return (
    <div className="payment min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">Riwayat Pembayaran</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total</th>
                <th>Waktu</th>
                <th>Forward</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pmt) => (
                <tr key={pmt.id}>
                  <td>{pmt.order_id}</td>
                  <td>
                    <span className="badge">{pmt.transaction_status}</span>
                  </td>
                  <td>Rp {parseFloat(pmt.gross_amount).toLocaleString()}</td>
                  <td>{new Date(pmt.transaction_time).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        pmt.forward_status === "success"
                          ? "badge-success"
                          : pmt.forward_status === "failed"
                          ? "badge-error"
                          : "badge-warning"
                      }`}>
                      {pmt.forward_status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedPayment(pmt)}
                      className="btn btn-xs btn-outline">
                      Lihat
                    </button>
                    <button
                      onClick={() => retryForward(pmt.id)}
                      className="btn btn-xs btn-accent">
                      Retry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedPayment && (
        <dialog id="my_modal" className="modal modal-open">
          <form method="dialog" className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg">Detail Pembayaran</h3>
            <p className="text-xs text-gray-500">
              Order ID: {selectedPayment.order_id}
            </p>
            <pre className="bg-base-200 p-3 mt-4 text-xs overflow-x-auto max-h-[400px] rounded">
              {JSON.stringify(JSON.parse(selectedPayment.raw_payload), null, 2)}
            </pre>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedPayment(null)}>
                Tutup
              </button>
            </div>
          </form>
        </dialog>
      )}
      <Footer />
    </div>
  );
}

export default Payment;
