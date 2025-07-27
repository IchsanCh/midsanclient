import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RedirectRules() {
  const [rules, setRules] = useState([]);
  const [pola, setPola] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editRule, setEditRule] = useState(null);
  const [editPola, setEditPola] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:1031/api/redirect-rules");
      setRules(res.data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:1031/api/redirect-rules", {
        pola_data: pola,
        target_url: url,
      });
      setPola("");
      setUrl("");
      fetchRules();
    } catch (error) {
      console.error("Error creating rule:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRule = async (id) => {
    try {
      setDeleteLoading(id);
      await axios.delete(`http://localhost:1031/api/redirect-rules/${id}`);
      fetchRules();
    } catch (error) {
      console.error("Error deleting rule:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const openEditModal = (rule) => {
    setEditRule(rule);
    setEditPola(rule.pola_data);
    setEditUrl(rule.target_url);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditRule(null);
    setEditPola("");
    setEditUrl("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      await axios.put(
        `http://localhost:1031/api/redirect-rules/${editRule.id}`,
        {
          pola_data: editPola,
          target_url: editUrl,
        }
      );
      closeEditModal();
      fetchRules();
    } catch (error) {
      console.error("Error updating rule:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Redirect Rules
          </h1>
          <p className="text-base-content/70">
            Kelola aturan redirect untuk aplikasi Anda
          </p>
        </div>

        {/* Add New Rule Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 mb-8">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Redirect Rule Baru
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Pola Data</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: ORDER"
                    value={pola}
                    onChange={(e) => setPola(e.target.value)}
                    className="input input-bordered w-full focus:input-primary"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Pattern yang akan dicocokkan
                    </span>
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Target URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Contoh: https://sitaku.id/api/midtrans/process"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input input-bordered w-full focus:input-primary"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      URL tujuan redirect
                    </span>
                  </label>
                </div>
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}>
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Simpan Rule
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Rules List */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="card-title text-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Daftar Redirect Rules
              </h2>
              <div className="badge badge-primary badge-lg">
                {rules.length} rules
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : rules.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-base-content/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-base-content/70 mb-2">
                  Belum ada redirect rule
                </h3>
                <p className="text-base-content/50">
                  Mulai dengan menambahkan rule pertama Anda
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr className="border-base-300">
                        <th className="bg-base-200">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                              />
                            </svg>
                            Pola Data
                          </div>
                        </th>
                        <th className="bg-base-200">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                            Target URL
                          </div>
                        </th>
                        <th className="bg-base-200 w-32">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-base-200/50">
                          <td>
                            <div className="font-mono text-sm bg-base-200 px-2 py-1 rounded inline-block">
                              {rule.pola_data}
                            </div>
                          </td>
                          <td>
                            <a
                              href={rule.target_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-primary text-sm break-all hover:link-hover">
                              {rule.target_url}
                            </a>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal(rule)}
                                className="btn btn-warning btn-sm">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => deleteRule(rule.id)}
                                disabled={deleteLoading === rule.id}
                                className={`btn btn-error btn-sm ${
                                  deleteLoading === rule.id ? "loading" : ""
                                }`}>
                                {deleteLoading === rule.id ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                  <>
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Hapus
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="card bg-base-200 border border-base-300">
                      <div className="card-body p-4">
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-base-content/60 mb-1">
                              Pola Data
                            </div>
                            <div className="font-mono text-sm bg-base-100 px-2 py-1 rounded">
                              {rule.pola_data}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-base-content/60 mb-1">
                              Target URL
                            </div>
                            <a
                              href={rule.target_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-primary text-sm break-all block hover:link-hover">
                              {rule.target_url}
                            </a>
                          </div>

                          <div className="card-actions justify-end pt-2">
                            <button
                              onClick={() => openEditModal(rule)}
                              className="btn btn-warning btn-sm">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => deleteRule(rule.id)}
                              disabled={deleteLoading === rule.id}
                              className={`btn btn-error btn-sm ${
                                deleteLoading === rule.id ? "loading" : ""
                              }`}>
                              {deleteLoading === rule.id ? (
                                <>
                                  <span className="loading loading-spinner loading-xs"></span>
                                  Menghapus...
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Hapus
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Redirect Rule
              </h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={closeEditModal}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Pola Data</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: ORDER"
                  value={editPola}
                  onChange={(e) => setEditPola(e.target.value)}
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Pattern yang akan dicocokkan
                  </span>
                </label>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Target URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Contoh: https://sitaku.id/api/midtrans/process"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    URL tujuan redirect
                  </span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeEditModal}
                  disabled={updateLoading}>
                  Batal
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    updateLoading ? "loading" : ""
                  }`}
                  disabled={updateLoading}>
                  {updateLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Mengupdate...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Rule
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeEditModal}></div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default RedirectRules;
