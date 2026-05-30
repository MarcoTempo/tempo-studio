// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";



const CAPACIDAD = 16;
const PAGO_CLASE = 250;
const BONO_LLENO = 50;
const PAGO_VACIO = 100;
const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const STORAGE_KEY = "nomina_estudio_v11";

// ── Usuarios autorizados ──────────────────────────────────────
// Cambia estos datos a tu gusto
const USUARIOS = [
  { usuario: "admin",  clave: "tempo2026",  nombre: "Administrador" },
  { usuario: "marco",  clave: "estudio123", nombre: "Marco" },
];
const COLORES = ["#FF453A","#0A84FF","#FFD60A","#A29BFE","#FD79A8","#55EFC4","#FDCB6E","#74B9FF"];
const LOGO_B64 = "data:image/png;base64,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";

const calcularPago = (n) => {
  if (n === 0)  return { base: PAGO_VACIO,  bono: 0,         total: PAGO_VACIO,              tipo: "vacio"  };
  if (n > 14)   return { base: PAGO_CLASE,  bono: BONO_LLENO, total: PAGO_CLASE + BONO_LLENO, tipo: "lleno"  };
  return         { base: PAGO_CLASE,  bono: 0,         total: PAGO_CLASE,              tipo: "normal" };
};

function getSemanaLabel() {
  const hoy = new Date();
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
  const dom = new Date(lunes);
  dom.setDate(lunes.getDate() + 6);
  const fmt = d => `${d.getDate()}/${d.getMonth()+1}`;
  return `${fmt(lunes)} – ${fmt(dom)} / ${dom.getFullYear()}`;
}

function loadData() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
}

export default function App() {
  // ── Login ──
  const [loggedIn, setLoggedIn]       = useState(() => { try { return !!localStorage.getItem("tempo_session"); } catch { return false; } });
  const [loginUser, setLoginUser]     = useState("");
  const [loginPass, setLoginPass]     = useState("");
  const [loginError, setLoginError]   = useState("");
  const [showPass, setShowPass]       = useState(false);

  function handleLogin() {
    const u = USUARIOS.find(u => u.usuario === loginUser.trim() && u.clave === loginPass);
    if (u) {
      try { localStorage.setItem("tempo_session", u.usuario); } catch {}
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Usuario o contraseña incorrectos");
    }
  }

  function handleLogout() {
    try { localStorage.removeItem("tempo_session"); } catch {}
    setLoggedIn(false);
    setLoginUser("");
    setLoginPass("");
  }

  const saved = loadData();
  const [instructores, setInstructores] = useState(saved?.instructores || [
    { id: 1, nombre: "Instructor 1", color: COLORES[0], telefono: "" },
    { id: 2, nombre: "Instructor 2", color: COLORES[1], telefono: "" },
  ]);
  const [clases, setClases]             = useState(saved?.clases || {});
  const [semanaLabel, setSemanaLabel]   = useState(saved?.semanaLabel || getSemanaLabel());
  const [historial, setHistorial]       = useState(saved?.historial || []);
  const [vista, setVista]               = useState("registro");
  const [instrActivo, setInstrActivo]   = useState(instructores[0]?.id);
  const [modalClase, setModalClase]     = useState(null);
  const [asistInput, setAsistInput]     = useState("");
  const [editNombre, setEditNombre]     = useState(null);
  const [tmpNombre, setTmpNombre]       = useState("");
  const [showAddInstr, setShowAddInstr] = useState(false);
  const [newInstrName, setNewInstrName] = useState("");
  const [newInstrTel, setNewInstrTel]   = useState("");
  const [editTelModal, setEditTelModal] = useState(null); // instrId being edited
  const [tmpTel, setTmpTel]             = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash only once per session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("tempo_splash_shown")) return false;
    return true;
  });

  useEffect(() => {
    if (showSplash) {
      const t = setTimeout(() => {
        setShowSplash(false);
        try { sessionStorage.setItem("tempo_splash_shown", "1"); } catch {}
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [showSplash]);
  const [layout, setLayout] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return "desktop";
    return "mobile";
  });
  const [modalFirmas, setModalFirmas]   = useState(null); // dataURL de la imagen generada
  const [firmasLoading, setFirmasLoading] = useState(false);
  const [toastMsg, setToastMsg]         = useState("");
  // Modal resumen exportable
  const [modalExport, setModalExport]   = useState(null); // instrId | "all"
  const exportRef = useRef(null);

  useEffect(() => {
    saveData({ instructores, clases, semanaLabel, historial });
  }, [instructores, clases, semanaLabel, historial]);

  function toast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }

  // ── helpers clases ──
  function getClasesDia(instrId, dia) {
    return Object.entries(clases)
      .filter(([k]) => k.startsWith(`${instrId}_${dia}_`))
      .map(([k,v]) => ({ key: k, ...v }))
      .sort((a,b) => a.idx - b.idx);
  }
  function resumenInstructor(instrId) {
    const mc = Object.values(clases).filter(c => c.instrId === instrId);
    let total=0, clasesDadas=0, bono=0;
    mc.forEach(c => { const p=calcularPago(c.asistentes); total+=p.total; clasesDadas++; bono+=p.bono; });
    return { total, clasesDadas, bono };
  }
  const totalGlobal = instructores.reduce((a,i) => a + resumenInstructor(i.id).total, 0);

  function agregarClase(instrId, dia) {
    const idx = getClasesDia(instrId, dia).length;
    setModalClase({ instrId, dia, idx, editKey: null });
    setAsistInput("");
  }
  function editarClase(key, asistentes) {
    setModalClase({ editKey: key });
    setAsistInput(String(asistentes));
  }
  function guardarClase() {
    const val = parseInt(asistInput);
    if (isNaN(val)||val<0||val>CAPACIDAD) return;
    const key = modalClase.editKey || `${modalClase.instrId}_${modalClase.dia}_${modalClase.idx}`;
    setClases(prev => ({
      ...prev,
      [key]: modalClase.editKey
        ? { ...prev[key], asistentes: val }
        : { asistentes: val, instrId: modalClase.instrId, dia: modalClase.dia, idx: modalClase.idx }
    }));
    setModalClase(null);
  }
  function eliminarClase(key) {
    setClases(prev => { const n={...prev}; delete n[key]; return n; });
    setModalClase(null);
  }

  // ── instructores ──
  function addInstructor() {
    if (!newInstrName.trim()) return;
    const id = Date.now();
    setInstructores(prev => [...prev, { id, nombre: newInstrName.trim(), color: COLORES[prev.length % COLORES.length], telefono: newInstrTel.trim() }]);
    setNewInstrName(""); setNewInstrTel(""); setShowAddInstr(false); setInstrActivo(id);
  }
  function removeInstructor(id) {
    setInstructores(prev => prev.filter(i => i.id !== id));
    setClases(prev => { const n={}; Object.entries(prev).forEach(([k,v])=>{ if(v.instrId!==id) n[k]=v; }); return n; });
    if (instrActivo===id) setInstrActivo(instructores.find(i=>i.id!==id)?.id);
  }

  // ── historial ──
  function cerrarSemana() {
    const entrada = {
      id: Date.now(),
      semana: semanaLabel,
      fecha: new Date().toLocaleDateString("es-MX"),
      instructores: instructores.map(i => {
        const r = resumenInstructor(i.id);
        const detalle = DIAS.map(dia => ({
          dia, clases: getClasesDia(i.id, dia).map(c => ({ asistentes: c.asistentes, pago: calcularPago(c.asistentes) }))
        })).filter(d => d.clases.length > 0);
        return { id: i.id, nombre: i.nombre, color: i.color, ...r, detalle };
      }),
      total: totalGlobal,
      pagado: false,
    };
    setHistorial(prev => [entrada, ...prev]);
    setClases({});
    setSemanaLabel(getSemanaLabel());
    setConfirmReset(false);
    setVista("historial");
  }
  function togglePagado(id) {
    setHistorial(prev => prev.map(h => h.id===id ? {...h, pagado: !h.pagado} : h));
  }
  function borrarHistorial(id) {
    setHistorial(prev => prev.filter(h => h.id!==id));
  }

  // ── Generar imagen de firmas ──
  async function generarPDFFirmas(coaches_list, semana_str) {
    setFirmasLoading(true);
    setModalFirmas(null);
    const SCALE  = 2;          // retina
    const CW     = 1100;       // ancho canvas (px base)
    const HDR_H  = 110;        // banda superior
    const INTRO_H= 52;
    const TBL_HDR= 40;
    const ROW_H  = 90;
    const FOOT_H = 38;
    const PAD    = 28;
    const CH     = HDR_H + INTRO_H + TBL_HDR + coaches_list.length * ROW_H + FOOT_H + 20;

    const canvas = document.createElement("canvas");
    canvas.width  = CW * SCALE;
    canvas.height = CH * SCALE;
    const ctx = canvas.getContext("2d");
    ctx.scale(SCALE, SCALE);

    // ── helpers ──
    const hex = (h) => {
      const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
      return `rgb(${r},${g},${b})`;
    };
    const NAVY    = "#0A0A0A";
    const BLUE    = "#0060DF";
    const BLUE_LT = "#0A84FF";
    const WHITE   = "#FFFFFF";
    const GRAY_D  = "#161622";
    const GRAY_M  = "#3A3A3C";
    const GRAY_L  = "#8E8E93";
    const BG_ROW  = "#F2F2F7";
    const LINE_C  = "#DDDDEF";

    // ── Fondo blanco ──
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, CW, CH);

    // ── Banda superior ──
    ctx.fillStyle = NAVY;
    ctx.fillRect(0, 0, CW, HDR_H);
    ctx.fillStyle = BLUE;
    ctx.fillRect(0, 0, 7, HDR_H);

    // Logo
    await new Promise((res) => {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 20, 16, 72, 72); res(); };
      img.onerror = res;
      img.src = "data:image/png;base64,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";
    });

    // Texto header
    ctx.fillStyle = WHITE;
    ctx.font = "bold 26px Arial";
    ctx.fillText("TEMPO STUDIO", 104, 54);
    ctx.font = "13px Arial";
    ctx.fillStyle = "#636366";
    ctx.fillText("POWER OF MUSIC ON EFFICIENT TIME", 105, 76);

    // Título derecha
    ctx.fillStyle = WHITE;
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "right";
    ctx.fillText("COMPROBANTE DE PAGO — FIRMA DE RECIBIDO", CW - PAD, 50);
    ctx.font = "12px Arial";
    ctx.fillStyle = "#636366";
    const hoy = new Date().toLocaleDateString("es-MX", { day:"2-digit", month:"long", year:"numeric" });
    ctx.fillText(`Semana: ${semana_str}   |   ${hoy}`, CW - PAD, 72);
    ctx.textAlign = "left";

    // Línea separadora
    ctx.strokeStyle = BLUE_LT;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PAD, HDR_H + 1); ctx.lineTo(CW - PAD, HDR_H + 1); ctx.stroke();

    // ── Texto intro ──
    ctx.fillStyle = GRAY_M;
    ctx.font = "12px Arial";
    const intro = "El presente documento certifica que los instructores abajo firmantes han recibido conforme el pago correspondiente a la semana indicada, de acuerdo con las clases impartidas y los criterios de compensación vigentes en Tempo Studio.";
    // word wrap
    const maxW = CW - PAD * 2;
    const words = intro.split(" ");
    let line = "", lineY = HDR_H + 26;
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(line, PAD, lineY);
        line = w; lineY += 18;
      } else { line = test; }
    }
    ctx.fillText(line, PAD, lineY);

    // ── Tabla ──
    const TABLE_Y = HDR_H + INTRO_H;
    // Columnas: x, w, label
    const COLS = [
      { x: PAD,       w: 40,  label: "#"                              },
      { x: PAD+40,    w: 280, label: "NOMBRE DEL COACH / INSTRUCTOR"  },
      { x: PAD+320,   w: 480, label: "FIRMA"                          },
      { x: PAD+800,   w: 244, label: "FECHA DE RECIBIDO"              },
    ];

    // Encabezado tabla
    ctx.fillStyle = NAVY;
    ctx.fillRect(PAD, TABLE_Y, CW - PAD*2, TBL_HDR);
    ctx.fillStyle = WHITE;
    ctx.font = "bold 12px Arial";
    COLS.forEach(col => ctx.fillText(col.label, col.x + 6, TABLE_Y + 26));

    // Filas
    coaches_list.forEach((nombre, idx) => {
      const Y = TABLE_Y + TBL_HDR + idx * ROW_H;

      // Fondo
      ctx.fillStyle = idx % 2 === 0 ? BG_ROW : WHITE;
      ctx.fillRect(PAD, Y, CW - PAD*2, ROW_H);

      // Acento azul izq
      ctx.fillStyle = BLUE_LT;
      ctx.fillRect(PAD, Y, 5, ROW_H);

      // Línea inferior
      ctx.strokeStyle = LINE_C;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(PAD, Y + ROW_H); ctx.lineTo(CW - PAD, Y + ROW_H); ctx.stroke();

      // Número
      ctx.fillStyle = GRAY_M;
      ctx.font = "bold 15px Arial";
      ctx.textAlign = "center";
      ctx.fillText(String(idx + 1), COLS[0].x + COLS[0].w / 2, Y + ROW_H / 2 + 5);
      ctx.textAlign = "left";

      // Nombre
      ctx.fillStyle = GRAY_D;
      ctx.font = "bold 17px Arial";
      ctx.fillText(nombre, COLS[1].x + 6, Y + ROW_H / 2 + 6);

      // Línea firma punteada
      const lineY2 = Y + ROW_H * 0.65;
      ctx.strokeStyle = GRAY_M;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(COLS[2].x + 10, lineY2);
      ctx.lineTo(COLS[2].x + COLS[2].w - 10, lineY2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = GRAY_L;
      ctx.font = "11px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Firma", COLS[2].x + COLS[2].w / 2, Y + ROW_H - 10);

      // Línea fecha punteada
      ctx.strokeStyle = GRAY_M;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(COLS[3].x + 10, lineY2);
      ctx.lineTo(COLS[3].x + COLS[3].w - 10, lineY2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = GRAY_L;
      ctx.font = "11px Arial";
      ctx.fillText("Fecha de recibido", COLS[3].x + COLS[3].w / 2, Y + ROW_H - 10);
      ctx.textAlign = "left";
    });

    // Borde tabla
    ctx.strokeStyle = LINE_C;
    ctx.lineWidth = 1;
    ctx.strokeRect(PAD, TABLE_Y, CW - PAD*2, TBL_HDR + coaches_list.length * ROW_H);

    // ── Pie ──
    const PIE_Y = TABLE_Y + TBL_HDR + coaches_list.length * ROW_H + 10;
    ctx.fillStyle = NAVY;
    ctx.fillRect(0, PIE_Y, CW, FOOT_H);
    ctx.fillStyle = "#636366";
    ctx.font = "11px Arial";
    ctx.fillText("Tempo Studio  ·  POWER OF MUSIC ON EFFICIENT TIME", PAD, PIE_Y + 24);
    ctx.textAlign = "right";
    ctx.fillText(`Generado: ${hoy}  ·  Semana ${semana_str}`, CW - PAD, PIE_Y + 24);
    ctx.textAlign = "left";

    // ── Mostrar en modal ──
    const dataURL = canvas.toDataURL("image/png");
    setFirmasLoading(false);
    setModalFirmas({ dataURL, fileName: `Firmas_Tempo_${semana_str.replace(/[\s/–]/g, "_")}.png` });
  }

  // ── WhatsApp ──  // ── WhatsApp ──
  function generarMensajeWA(instr) {
    const r = resumenInstructor(instr.id);
    if (r.clasesDadas === 0) { toast("Este instructor no tiene clases registradas"); return; }
    const porDia = DIAS.map(dia => ({ dia, cs: getClasesDia(instr.id, dia) })).filter(d => d.cs.length > 0);
    const lineasDias = porDia.map(({ dia, cs }) => {
      const detalle = cs.map(c => {
        const p = calcularPago(c.asistentes);
        return `  • ${c.asistentes}/${CAPACIDAD}${p.bono > 0 ? " 🎉 +bono" : p.tipo === "vacio" ? " ⚠️" : ""} → $${p.total}`;
      }).join("\n");
      return `📅 ${dia}\n${detalle}`;
    }).join("\n\n");

    const msg =
`Hola ${instr.nombre} 👋

Aquí está tu resumen de esta semana (${semanaLabel}):

${lineasDias}

──────────────
🧾 Clases: ${r.clasesDadas}
💰 Base: $${(r.total - r.bono).toLocaleString()}${r.bono > 0 ? `\n🎁 Bonos: $${r.bono.toLocaleString()}` : ""}
✅ *Total a pagar: $${r.total.toLocaleString()}*

¡Gracias por tu trabajo esta semana! 💪`;

    const phone = instr.telefono ? instr.telefono.replace(/\D/g, "") : "";
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  // ── Exportar tarjeta como imagen ──
  // Usamos html-to-image si está disponible, si no copiamos el texto
  async function exportarTarjeta(instrId) {
    setModalExport(instrId);
  }

  function copiarResumenTexto(instr) {
    const r = resumenInstructor(instr.id);
    const porDia = DIAS.map(dia => ({ dia, cs: getClasesDia(instr.id, dia) })).filter(d => d.cs.length > 0);
    const lineas = porDia.map(({ dia, cs }) =>
      `${dia}: ` + cs.map(c => `${c.asistentes}/${CAPACIDAD} $${calcularPago(c.asistentes).total}`).join(" | ")
    ).join("\n");
    const txt = `${instr.nombre} — Semana ${semanaLabel}\n${lineas}\nTotal: $${r.total.toLocaleString()}`;
    navigator.clipboard?.writeText(txt).then(() => toast("Copiado al portapapeles ✓")).catch(() => toast("No se pudo copiar"));
  }

  // Render tarjeta de resumen (para modal exportable)
  function TarjetaResumen({ instrId }) {
    const instr = instrId === "all"
      ? null
      : instructores.find(i => i.id === instrId);

    if (instrId === "all") {
      return (
        <div ref={exportRef} style={{
          background: "linear-gradient(135deg, #12122A 0%, #1A1A3E 100%)",
          borderRadius: 16, padding: 20, width: "100%", boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><img src="data:image/png;base64,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" alt="Tempo" style={{ height: 20, filter: "brightness(0) invert(1)" }} /><span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#F0EDE8" }}>TEMPO STUDIO</span></div>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 2 }}>Nómina Semanal</div>
          <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginBottom: 16 }}>{semanaLabel}</div>
          {instructores.map(i => {
            const r = resumenInstructor(i.id);
            if (r.clasesDadas === 0) return null;
            return (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: `${i.color}15`, borderRadius: 10, marginBottom: 8, border: `1px solid ${i.color}30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: i.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{i.nombre}</span>
                  <span style={{ fontSize: 11, color: "rgba(240,237,232,0.4)" }}>{r.clasesDadas} clases</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: i.color }}>${r.total.toLocaleString()}</span>
              </div>
            );
          })}
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(10,132,255,0.15)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #4A6FE333" }}>
            <span style={{ fontSize: 12, color: "#0A84FF", fontWeight: 600 }}>TOTAL A PAGAR</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#0A84FF" }}>${totalGlobal.toLocaleString()}</span>
          </div>
        </div>
      );
    }

    if (!instr) return null;
    const r = resumenInstructor(instr.id);
    const porDia = DIAS.map(dia => ({ dia, cs: getClasesDia(instr.id, dia) })).filter(d => d.cs.length > 0);

    return (
      <div ref={exportRef} style={{
        background: "linear-gradient(135deg, #12122A 0%, #1A1A3E 100%)",
        borderRadius: 16, padding: 20, width: "100%", boxSizing: "border-box"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><img src="data:image/png;base64,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" alt="Tempo" style={{ height: 20, filter: "brightness(0) invert(1)" }} /><span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#F0EDE8" }}>TEMPO STUDIO</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{instr.nombre}</div>
            <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginTop: 2 }}>{semanaLabel}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: instr.color }}>${r.total.toLocaleString()}</div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[
            { l: "Clases", v: r.clasesDadas },
            { l: "Base", v: `$${(r.total - r.bono).toLocaleString()}` },
            { l: "Bonos", v: `$${r.bono.toLocaleString()}`, c: "#0A84FF" },
          ].map(s => (
            <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "7px 0", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: s.c || "#F0EDE8" }}>{s.v}</div>
              <div style={{ fontSize: 9, color: "rgba(240,237,232,0.35)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Detalle por día */}
        {porDia.map(({ dia, cs }) => (
          <div key={dia} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "rgba(240,237,232,0.35)", letterSpacing: 1, marginBottom: 4 }}>{dia.toUpperCase()}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {cs.map((c, i) => {
                const p = calcularPago(c.asistentes);
                return (
                  <div key={i} style={{
                    fontSize: 11, padding: "3px 9px", borderRadius: 6, fontWeight: 600,
                    background: p.tipo === "lleno" ? "#4A6FE322" : p.tipo === "vacio" ? "#FF453A18" : "rgba(255,255,255,0.07)",
                    color: p.tipo === "lleno" ? "#0A84FF" : p.tipo === "vacio" ? "#FF453A" : "rgba(240,237,232,0.7)",
                    border: `1px solid ${p.tipo === "lleno" ? "#4A6FE333" : p.tipo === "vacio" ? "#FF453A33" : "rgba(255,255,255,0.08)"}`
                  }}>
                    {c.asistentes}/{CAPACIDAD} · ${p.total}{p.bono > 0 ? " 🎉" : ""}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {porDia.length === 0 && (
          <div style={{ fontSize: 12, color: "rgba(240,237,232,0.25)", textAlign: "center", padding: "8px 0" }}>Sin clases registradas</div>
        )}
      </div>
    );
  }

  const instrActualObj = instructores.find(i => i.id === instrActivo);
  const TABS = [
    { id: "registro",  icon: "📋", label: "Registro" },
    { id: "resumen",   icon: "📊", label: "Resumen" },
    { id: "historial", icon: "🗂️", label: "Historial" },
  ];

  // ── Splash screen ──
  if (showSplash) {
    return (
      <div style={{
        minHeight:"100vh", background:"#000000",
        fontFamily:"-apple-system,BlinkMacSystemFont,Helvetica Neue,Arial,sans-serif",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        position:"relative", overflow:"hidden"
      }}>
        <style>{`
          @keyframes splashOrb1 {
            0%   { transform: scale(0.8) translate(0,0);   opacity:0; }
            30%  { opacity: 0.6; }
            100% { transform: scale(1.4) translate(20px,-30px); opacity:0; }
          }
          @keyframes splashOrb2 {
            0%   { transform: scale(0.6) translate(0,0);   opacity:0; }
            40%  { opacity:0.5; }
            100% { transform: scale(1.3) translate(-25px,25px); opacity:0; }
          }
          @keyframes splashOrb3 {
            0%   { transform: scale(0.5); opacity:0; }
            50%  { opacity:0.4; }
            100% { transform: scale(1.6); opacity:0; }
          }
          @keyframes logoIn {
            0%   { opacity:0; transform: scale(0.6) translateY(20px); filter: blur(12px); }
            60%  { opacity:1; transform: scale(1.05) translateY(-4px); filter: blur(0px); }
            100% { opacity:1; transform: scale(1) translateY(0); filter: blur(0px); }
          }
          @keyframes nameIn {
            0%   { opacity:0; transform: translateY(16px) skewX(-4deg); letter-spacing: 8px; }
            100% { opacity:1; transform: translateY(0) skewX(0deg); letter-spacing: 0.5px; }
          }
          @keyframes tagIn {
            0%   { opacity:0; transform: translateY(10px); }
            100% { opacity:0.4; transform: translateY(0); }
          }
          @keyframes lineExpand {
            0%   { width: 0; opacity:0; }
            100% { width: 120px; opacity:1; }
          }
          @keyframes pulseGlow {
            0%,100% { box-shadow: 0 0 40px rgba(10,132,255,0.4), 0 0 80px rgba(10,132,255,0.2); }
            50%      { box-shadow: 0 0 60px rgba(10,132,255,0.7), 0 0 120px rgba(10,132,255,0.3); }
          }
          @keyframes fadeOut {
            0%   { opacity:1; }
            100% { opacity:0; transform: scale(1.05); }
          }
          .splash-container {
            animation: fadeOut 0.5s ease-in-out 2.8s both;
          }
        `}</style>

        {/* Background orbs */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"15%", left:"15%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(10,132,255,0.35) 0%,transparent 65%)", animation:"splashOrb1 3s ease-out forwards" }}/>
          <div style={{ position:"absolute", bottom:"10%", right:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,96,223,0.3) 0%,transparent 65%)", animation:"splashOrb2 3s ease-out 0.2s forwards" }}/>
          <div style={{ position:"absolute", top:"40%", left:"40%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(48,209,88,0.15) 0%,transparent 65%)", animation:"splashOrb3 3s ease-out 0.4s forwards" }}/>
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(10,132,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(10,132,255,0.05) 1px,transparent 1px)", backgroundSize:"60px 60px" }}/>
        </div>

        {/* Main content */}
        <div className="splash-container" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, position:"relative", zIndex:1 }}>

          {/* Logo with glow ring */}
          <div style={{
            position:"relative", marginBottom:28,
            animation:"logoIn 0.9s cubic-bezier(.16,1,.3,1) 0.2s both"
          }}>
            <div style={{
              position:"absolute", inset:-20, borderRadius:"50%",
              animation:"pulseGlow 2s ease-in-out 0.8s infinite"
            }}/>
            <div style={{
              width:110, height:110, borderRadius:"50%",
              background:"linear-gradient(135deg,rgba(10,132,255,0.2),rgba(0,0,0,0.8))",
              border:"1px solid rgba(10,132,255,0.4)",
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", zIndex:1
            }}>
              <img src={LOGO_B64} alt="Tempo" style={{ height:70, width:"auto", filter:"brightness(0) invert(1)" }}/>
            </div>
          </div>

          {/* Studio name */}
          <div style={{
            fontSize:32, fontWeight:900, color:"#FFFFFF", letterSpacing:0.5,
            background:"linear-gradient(135deg,#FFFFFF 0%,rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            animation:"nameIn 0.8s cubic-bezier(.16,1,.3,1) 0.8s both"
          }}>TEMPO STUDIO</div>

          {/* Animated line */}
          <div style={{
            height:1, background:"linear-gradient(90deg,transparent,#0A84FF,transparent)",
            margin:"12px 0",
            animation:"lineExpand 0.6s ease-out 1.4s both"
          }}/>

          {/* Tagline */}
          <div style={{
            fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:3,
            textTransform:"uppercase",
            animation:"tagIn 0.6s ease-out 1.6s both"
          }}>Power of Music on Efficient Time</div>

          {/* Loading dots */}
          <div style={{ display:"flex", gap:6, marginTop:40, animation:"tagIn 0.5s ease-out 2s both" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:5, height:5, borderRadius:"50%", background:"#0A84FF",
                animation:`pulseGlow 0.8s ease-in-out ${i*0.2}s infinite`
              }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Pantalla de login ──
  if (!loggedIn) {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#000000 0%,#050510 60%,#000000 100%)", fontFamily:"-apple-system,BlinkMacSystemFont,Helvetica Neue,Arial,sans-serif", color:"#F0EDE8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"fixed", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"10%", left:"20%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(10,132,255,0.2) 0%,transparent 70%)", animation:"orb1 12s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", bottom:"10%", right:"10%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,96,223,0.15) 0%,transparent 70%)", animation:"orb2 16s ease-in-out infinite" }}/>
        </div>
        <style>{`@keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-40px) scale(1.1)}} @keyframes orb2{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,30px)}}`}</style>

        <div style={{ width:"100%", maxWidth:360, position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:16 }}>
              <div style={{ position:"absolute", inset:-14, borderRadius:"50%", background:"radial-gradient(circle,rgba(10,132,255,0.3) 0%,transparent 70%)" }}/>
              <img src={LOGO_B64} alt="Tempo" style={{ height:70, width:"auto", filter:"brightness(0) invert(1)", position:"relative", zIndex:1 }}/>
            </div>
            <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:"#FFFFFF" }}>TEMPO STUDIO</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:6, letterSpacing:2.5, textTransform:"uppercase" }}>Power of Music on Efficient Time</div>
          </div>

          <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:22, padding:28, backdropFilter:"blur(30px)" }}>
            <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:22, textAlign:"center", letterSpacing:1, textTransform:"uppercase" }}>Acceso al sistema</div>

            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Usuario</div>
              <input value={loginUser} onChange={e=>{ setLoginUser(e.target.value); setLoginError(""); }}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                placeholder="Ingresa tu usuario" autoCapitalize="none" autoCorrect="off"
                style={{ width:"100%", padding:"12px 14px", background:"rgba(255,255,255,0.07)", border:`1px solid ${loginError?"rgba(255,69,58,0.5)":"rgba(255,255,255,0.12)"}`, borderRadius:10, color:"#F0EDE8", fontSize:15, outline:"none", boxSizing:"border-box" }}
              />
            </div>

            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Contraseña</div>
              <div style={{ position:"relative" }}>
                <input value={loginPass} onChange={e=>{ setLoginPass(e.target.value); setLoginError(""); }}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  type={showPass ? "text" : "password"} placeholder="Ingresa tu contraseña"
                  style={{ width:"100%", padding:"12px 44px 12px 14px", background:"rgba(255,255,255,0.07)", border:`1px solid ${loginError?"rgba(255,69,58,0.5)":"rgba(255,255,255,0.12)"}`, borderRadius:10, color:"#F0EDE8", fontSize:15, outline:"none", boxSizing:"border-box" }}
                />
                <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"transparent", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:18 }}>
                  {showPass?"🙈":"👁️"}
                </button>
              </div>
            </div>

            {loginError && (
              <div style={{ background:"rgba(255,69,58,0.12)", border:"1px solid rgba(255,69,58,0.3)", borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:12, color:"#FF453A", textAlign:"center" }}>
                ⚠️ {loginError}
              </div>
            )}

            <button onClick={handleLogin} disabled={!loginUser||!loginPass} style={{
              width:"100%", padding:14, background: loginUser&&loginPass ? "#0A84FF" : "rgba(255,255,255,0.08)",
              border:"none", borderRadius:10, color: loginUser&&loginPass ? "#fff" : "rgba(255,255,255,0.3)",
              fontWeight:800, fontSize:15, cursor: loginUser&&loginPass ? "pointer" : "default", letterSpacing:0.5
            }}>
              Entrar →
            </button>
          </div>
          <div style={{ textAlign:"center", marginTop:20, fontSize:11, color:"rgba(255,255,255,0.2)" }}>Sistema de nómina · Tempo Studio</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#000005", fontFamily:"-apple-system,BlinkMacSystemFont,Helvetica Neue,Arial,sans-serif", color:"#F0EDE8", paddingBottom:90, position:"relative", overflow:"hidden" }}>
      <style>{`
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        input, button, textarea { font-family: inherit; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(10,132,255,0.3); border-radius: 2px; }

        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); opacity:0.4; }
          33% { transform: translate(40px,-60px) scale(1.15); opacity:0.6; }
          66% { transform: translate(-30px,40px) scale(0.9); opacity:0.3; }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); opacity:0.3; }
          50% { transform: translate(-50px,30px) scale(1.2); opacity:0.5; }
        }
        @keyframes orb3 {
          0%,100% { transform: translate(0,0) scale(1); opacity:0.25; }
          40% { transform: translate(30px,50px) scale(0.85); opacity:0.4; }
          80% { transform: translate(-20px,-30px) scale(1.1); opacity:0.2; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity:0.6; }
          100% { transform: scale(1.5); opacity:0; }
        }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }

        .fade-up { animation: fadeUp 0.4s cubic-bezier(.16,1,.3,1) forwards; }

        .card-glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
        }
        .card-glass:active { transform: scale(0.98); transition: transform 0.1s; }

        .btn-primary {
          background: linear-gradient(135deg, #0A84FF, #0060DF);
          border: none; border-radius: 12px; color: #fff;
          font-weight: 700; cursor: pointer;
          transition: all 0.2s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 4px 24px rgba(10,132,255,0.3);
        }
        .btn-primary:active { transform: scale(0.96); box-shadow: 0 2px 12px rgba(10,132,255,0.2); }

        .stat-number {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }

        .tab-active {
          background: rgba(10,132,255,0.18) !important;
          color: #0A84FF !important;
        }

        .class-card {
          transition: all 0.2s cubic-bezier(.16,1,.3,1);
          cursor: pointer;
        }
        .class-card:active { transform: scale(0.95); }
      `}</style>

      {/* ── Animated orbs background ── */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-10%", left:"20%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(10,132,255,0.18) 0%, transparent 70%)", animation:"orb1 12s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", top:"40%", right:"-5%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,96,223,0.14) 0%, transparent 70%)", animation:"orb2 16s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"10%", left:"10%", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(48,209,88,0.08) 0%, transparent 70%)", animation:"orb3 20s ease-in-out infinite" }}/>
        {/* Grid lines */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(10,132,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,132,255,0.04) 1px, transparent 1px)", backgroundSize:"60px 60px" }}/>
      </div>
      <div style={{ position:"relative", zIndex:1 }}>

      {/* Toast */}
      {toastMsg && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", background: "#0A84FF", color: "#000000", padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, zIndex: 500, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          {toastMsg}
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "10px 14px 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative" }}>
                <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:"radial-gradient(circle,rgba(10,132,255,0.25) 0%,transparent 70%)", animation:"orb1 4s ease-in-out infinite" }}/>
                <img src={LOGO_B64} alt="Tempo" style={{ height: 30, width: "auto", filter: "brightness(0) invert(1)", position:"relative", zIndex:1 }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.5, color: "#FFFFFF", lineHeight: 1.1 }}>TEMPO STUDIO</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 3, letterSpacing: 1.5, textTransform: "uppercase" }}>{semanaLabel}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 3, letterSpacing: 1, textTransform: "uppercase" }}>Total semana</div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, background: "linear-gradient(135deg,#0A84FF,#5AC8FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontVariantNumeric: "tabular-nums" }}>${totalGlobal.toLocaleString()}</div>
              <button onClick={handleLogout} style={{ marginTop: 4, fontSize: 9, color: "rgba(255,255,255,0.2)", background: "transparent", border: "none", cursor: "pointer", padding: 0, letterSpacing: 0.5 }}>Cerrar sesión</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "3px", marginBottom: 2 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setVista(t.id)} style={{
                flex: 1, padding: "6px 0", border: "none", cursor: "pointer",
                background: vista === t.id ? "rgba(10,132,255,0.28)" : "transparent",
                borderRadius: 10,
                color: vista === t.id ? "#0A84FF" : "rgba(255,255,255,0.35)",
                fontWeight: vista === t.id ? 700 : 400,
                fontSize: 10, transition: "all 0.2s cubic-bezier(.16,1,.3,1)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                boxShadow: vista === t.id ? "0 0 20px rgba(10,132,255,0.15)" : "none"
              }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span style={{ fontSize: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: layout==="desktop" ? "100%" : 540, margin: "0 auto", padding: layout==="desktop" ? "24px 32px 0" : "10px 12px 0", display: layout==="desktop" ? "flex" : "block", gap: layout==="desktop" ? 24 : 0, alignItems: "flex-start" }}>

        {/* ══════════ REGISTRO ══════════ */}
        {vista === "registro" && (
          <>
            {layout==="desktop" ? (
            // ── DESKTOP LAYOUT ──
            <>
              {/* LEFT PANEL — Instructores */}
              <div style={{ width:260, flexShrink:0, position:"sticky", top:130 }}>
                <div style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>Instructores</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {instructores.map(i => {
                      const r = resumenInstructor(i.id);
                      const activo = instrActivo === i.id;
                      return (
                        <button key={i.id} onClick={()=>setInstrActivo(i.id)} style={{
                          padding:"12px 14px", borderRadius:12, border:`1.5px solid ${activo ? i.color : "rgba(255,255,255,0.08)"}`,
                          background: activo ? `${i.color}18` : "rgba(255,255,255,0.03)",
                          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between",
                          transition:"all 0.2s", boxShadow: activo ? `0 0 20px ${i.color}22` : "none"
                        }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:10, height:10, borderRadius:"50%", background:i.color, boxShadow:`0 0 8px ${i.color}` }}/>
                            <span style={{ fontSize:13, fontWeight:600, color: activo ? i.color : "rgba(255,255,255,0.7)" }}>{i.nombre}</span>
                          </div>
                          <span style={{ fontSize:14, fontWeight:800, color: activo ? i.color : "rgba(255,255,255,0.4)" }}>${r.total.toLocaleString()}</span>
                        </button>
                      );
                    })}
                    <button onClick={()=>setShowAddInstr(true)} style={{ padding:"10px 14px", borderRadius:12, border:"1.5px dashed rgba(255,255,255,0.1)", background:"transparent", cursor:"pointer", fontSize:12, color:"rgba(255,255,255,0.3)", textAlign:"center" }}>+ Agregar instructor</button>
                  </div>
                </div>
                {/* Resumen rápido del instructor activo */}
                {instrActualObj && (() => {
                  const r = resumenInstructor(instrActualObj.id);
                  return (
                    <div style={{ background:`linear-gradient(135deg, ${instrActualObj.color}18, transparent)`, border:`1px solid ${instrActualObj.color}25`, borderRadius:16, padding:16 }}>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>Semana actual</div>
                      {[{l:"Clases",v:r.clasesDadas},{l:"Base",v:`$${(r.total-r.bono).toLocaleString()}`},{l:"Bonos",v:`$${r.bono.toLocaleString()}`,c:"#30D158"},{l:"Total",v:`$${r.total.toLocaleString()}`,c:instrActualObj.color}].map(s=>(
                        <div key={s.l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                          <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{s.l}</span>
                          <span style={{ fontSize:13, fontWeight:700, color:s.c||"rgba(255,255,255,0.8)" }}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
              {/* RIGHT PANEL — Days grid */}
              <div style={{ flex:1, minWidth:0 }}>
                {instrActualObj && (
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, padding:"12px 16px", background:`${instrActualObj.color}15`, borderRadius:14, border:`1px solid ${instrActualObj.color}20` }}>
                    <span style={{ fontSize:18, fontWeight:700, color:instrActualObj.color }}>{instrActualObj.nombre}</span>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={()=>{ setEditNombre(instrActualObj.id); setTmpNombre(instrActualObj.nombre); }} style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:16 }}>✏️</button>
                      <button onClick={()=>{ setEditTelModal(instrActualObj.id); setTmpTel(instrActualObj.telefono||""); }} style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:12, color:instrActualObj.telefono?"#30D158":"rgba(255,255,255,0.3)" }}>📱 {instrActualObj.telefono||"Agregar tel"}</button>
                      {instructores.length>1&&<button onClick={()=>removeInstructor(instrActualObj.id)} style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:16 }}>🗑️</button>}
                    </div>
                  </div>
                )}
                {instrActualObj && (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:12 }}>
                    {DIAS.map(dia => {
                      const csDia = getClasesDia(instrActualObj.id, dia);
                      const subtotal = csDia.reduce((a,c)=>a+calcularPago(c.asistentes).total,0);
                      return (
                        <div key={dia} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:14 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                            <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:1.5 }}>{dia}</span>
                            {subtotal>0&&<span style={{ fontSize:12, fontWeight:700, color:instrActualObj.color }}>${subtotal}</span>}
                          </div>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                            {csDia.map(c=>{
                              const p=calcularPago(c.asistentes);
                              return(
                                <button key={c.key} onClick={()=>editarClase(c.key,c.asistentes)} style={{
                                  background:p.tipo==="lleno"?"rgba(48,209,88,0.08)":p.tipo==="vacio"?"rgba(255,69,58,0.08)":"rgba(255,255,255,0.04)",
                                  border:`1px solid ${p.tipo==="lleno"?"rgba(48,209,88,0.3)":p.tipo==="vacio"?"rgba(255,69,58,0.25)":"rgba(255,255,255,0.08)"}`,
                                  borderRadius:10, padding:"8px 10px", cursor:"pointer", textAlign:"left", minWidth:80, transition:"all 0.15s"
                                }}>
                                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                                    <span style={{ fontSize:9, color:"rgba(255,255,255,0.4)" }}>Clase {c.idx+1}</span>
                                    {p.tipo==="lleno"&&<span style={{ fontSize:8, background:"rgba(48,209,88,0.2)", color:"#30D158", borderRadius:3, padding:"1px 4px", fontWeight:700 }}>BONO</span>}
                                    {p.tipo==="vacio"&&<span style={{ fontSize:8, background:"rgba(255,69,58,0.2)", color:"#FF453A", borderRadius:3, padding:"1px 4px", fontWeight:700 }}>VACÍO</span>}
                                  </div>
                                  <div style={{ fontSize:13, fontWeight:800 }}>{c.asistentes}<span style={{ fontSize:8, color:"rgba(255,255,255,0.3)" }}>/{CAPACIDAD}</span></div>
                                  <div style={{ height:2, background:"rgba(255,255,255,0.06)", borderRadius:1, margin:"4px 0" }}>
                                    <div style={{ height:"100%", width:`${(c.asistentes/CAPACIDAD)*100}%`, background:p.tipo==="lleno"?"#30D158":p.tipo==="vacio"?"#FF453A":instrActualObj.color, borderRadius:1 }}/>
                                  </div>
                                  <div style={{ fontSize:11, fontWeight:700, color:p.tipo==="lleno"?"#30D158":p.tipo==="vacio"?"#FF453A":"rgba(255,255,255,0.8)" }}>${p.total}</div>
                                </button>
                              );
                            })}
                            <button onClick={()=>agregarClase(instrActualObj.id,dia)} style={{ background:"transparent", border:"2px dashed rgba(255,255,255,0.08)", borderRadius:10, padding:"8px 10px", cursor:"pointer", color:"rgba(255,255,255,0.2)", fontSize:20, minWidth:52, minHeight:76, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            // ── MOBILE LAYOUT (existing) ──
            <>
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 10, color: "rgba(240,237,232,0.35)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Instructor</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {instructores.map(i => {
                  const r = resumenInstructor(i.id);
                  const activo = instrActivo === i.id;
                  return (
                    <button key={i.id} onClick={() => setInstrActivo(i.id)} style={{
                      padding: "6px 11px", borderRadius: 50, border: `1.5px solid ${activo ? i.color : "rgba(255,255,255,0.1)"}`,
                      background: activo ? `${i.color}22` : "rgba(255,255,255,0.04)",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
                      transition: "all 0.25s cubic-bezier(.16,1,.3,1)",
                      boxShadow: activo ? `0 0 20px ${i.color}33` : "none",
                      backdropFilter: "blur(10px)"
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: i.color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: activo ? i.color : "rgba(240,237,232,0.6)" }}>{i.nombre}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: activo ? i.color : "rgba(240,237,232,0.3)" }}>${r.total.toLocaleString()}</span>
                    </button>
                  );
                })}
                <button onClick={() => setShowAddInstr(true)} style={{ padding: "7px 12px", borderRadius: 20, border: "2px dashed rgba(255,255,255,0.12)", background: "transparent", cursor: "pointer", fontSize: 12, color: "rgba(240,237,232,0.35)" }}>+ Agregar</button>
              </div>
            </div>

            {instrActualObj && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "8px 10px", background: `${instrActualObj.color}15`, borderRadius: 10, border: `1px solid ${instrActualObj.color}25` }}>
                {editNombre === instrActualObj.id ? (
                  <input value={tmpNombre} onChange={e => setTmpNombre(e.target.value)}
                    onBlur={() => { if (tmpNombre.trim()) setInstructores(prev => prev.map(i => i.id === instrActualObj.id ? { ...i, nombre: tmpNombre.trim() } : i)); setEditNombre(null); }}
                    onKeyDown={e => e.key === "Enter" && e.target.blur()} autoFocus
                    style={{ background: "transparent", border: "none", color: instrActualObj.color, fontSize: 14, fontWeight: 700, outline: "none", width: "100%" }}
                  />
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 700, color: instrActualObj.color }}>{instrActualObj.nombre}</span>
                )}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => { setEditTelModal(instrActualObj.id); setTmpTel(instrActualObj.telefono || ""); }} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: instrActualObj.telefono ? "#25D366" : "rgba(240,237,232,0.3)", display: "flex", alignItems: "center", gap: 3 }}>
                    📱{instrActualObj.telefono ? instrActualObj.telefono : "tel"}
                  </button>
                  <button onClick={() => { setEditNombre(instrActualObj.id); setTmpNombre(instrActualObj.nombre); }} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 13 }}>✏️</button>
                  {instructores.length > 1 && <button onClick={() => removeInstructor(instrActualObj.id)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 13 }}>🗑️</button>}
                </div>
              </div>
            )}

            {instrActualObj && DIAS.map(dia => {
              const csDia = getClasesDia(instrActualObj.id, dia);
              const subtotal = csDia.reduce((a, c) => a + calcularPago(c.asistentes).total, 0);
              return (
                <div key={dia} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(240,237,232,0.4)", textTransform: "uppercase", letterSpacing: 1.5 }}>{dia}</span>
                    {subtotal > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: instrActualObj.color }}>${subtotal}</span>}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {csDia.map(c => {
                      const p = calcularPago(c.asistentes);
                      return (
                        <button key={c.key} onClick={() => editarClase(c.key, c.asistentes)} style={{
                          background: "rgba(255,255,255,0.04)", border: `1px solid ${p.tipo === "lleno" ? "#0A84FF" : p.tipo === "vacio" ? "#FF453A44" : "rgba(255,255,255,0.08)"}`,
                          borderRadius: 10, padding: "7px 9px", cursor: "pointer", textAlign: "left", minWidth: 82
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <span style={{ fontSize: 10, color: "rgba(240,237,232,0.4)" }}>Clase {c.idx + 1}</span>
                            {p.tipo === "lleno" && <span style={{ fontSize: 9, background: "#4A6FE322", color: "#0A84FF", borderRadius: 4, padding: "1px 4px", fontWeight: 700 }}>BONO</span>}
                            {p.tipo === "vacio" && <span style={{ fontSize: 9, background: "#FF453A22", color: "#FF453A", borderRadius: 4, padding: "1px 4px", fontWeight: 700 }}>VACÍO</span>}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>{c.asistentes}<span style={{ fontSize: 9, color: "rgba(240,237,232,0.3)", fontWeight: 400 }}>/{CAPACIDAD}</span></div>
                          <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginBottom: 3 }}>
                            <div style={{ height: "100%", width: `${(c.asistentes / CAPACIDAD) * 100}%`, background: p.tipo === "lleno" ? "#0A84FF" : p.tipo === "vacio" ? "#FF453A" : instrActualObj.color, borderRadius: 2 }} />
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: p.tipo === "lleno" ? "#0A84FF" : p.tipo === "vacio" ? "#FF453A" : "rgba(240,237,232,0.8)" }}>${p.total}</div>
                        </button>
                      );
                    })}
                    <button onClick={() => agregarClase(instrActualObj.id, dia)} style={{
                      background: "transparent", border: "2px dashed rgba(255,255,255,0.08)", borderRadius: 10,
                      padding: "9px 13px", cursor: "pointer", color: "rgba(240,237,232,0.25)", fontSize: 22,
                      minWidth: 44, minHeight: 66, display: "flex", alignItems: "center", justifyContent: "center"
                    }}>+</button>
                  </div>
                </div>
              );
            })}
            </>
          )}
          </>
        )}

        {/* ══════════ RESUMEN ══════════ */}
        {vista === "resumen" && (
          <>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "rgba(240,237,232,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>Resumen de semana</div>
              {/* Exportar resumen global */}
              <button onClick={() => exportarTarjeta("all")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: "rgba(10,132,255,0.1)", border: "1px solid rgba(10,132,255,0.25)", borderRadius: 8, color: "#0A84FF", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                🖼️ Ver tarjeta
              </button>
            </div>


            {instructores.map(instr => {
              const r = resumenInstructor(instr.id);
              const porDia = DIAS.map(dia => ({ dia, clases: getClasesDia(instr.id, dia) })).filter(d => d.clases.length > 0);
              return (
                <div key={instr.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16, marginBottom: 10, backdropFilter: "blur(20px)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: instr.color }} />
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{instr.nombre}</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: instr.color, textShadow: `0 0 20px ${instr.color}66` }}>${r.total.toLocaleString()}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {[{ l: "Clases", v: r.clasesDadas }, { l: "Base", v: `$${(r.total - r.bono).toLocaleString()}` }, { l: "Bonos", v: `$${r.bono.toLocaleString()}`, c: "#0A84FF" }].map(s => (
                      <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", borderRadius: 12, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: s.c || "rgba(240,237,232,0.9)" }}>{s.v}</div>
                        <div style={{ fontSize: 9, color: "rgba(240,237,232,0.35)", marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  {porDia.map(({ dia, clases: cs }) => (
                    <div key={dia} style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 10, color: "rgba(240,237,232,0.3)", marginBottom: 3, letterSpacing: 1 }}>{dia.toUpperCase()}</div>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {cs.map(c => { const p = calcularPago(c.asistentes); return (
                          <div key={c.key} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 5, background: p.tipo === "lleno" ? "#4A6FE322" : p.tipo === "vacio" ? "#FF453A18" : "rgba(255,255,255,0.06)", color: p.tipo === "lleno" ? "#0A84FF" : p.tipo === "vacio" ? "#FF453A" : "rgba(240,237,232,0.6)", fontWeight: 600 }}>
                            {c.asistentes}/{CAPACIDAD} · ${p.total}{p.bono > 0 ? " 🎉" : ""}
                          </div>
                        ); })}
                      </div>
                    </div>
                  ))}
                  {r.clasesDadas === 0 && <div style={{ fontSize: 11, color: "rgba(240,237,232,0.2)", textAlign: "center", padding: "6px 0" }}>Sin clases registradas</div>}

                  {/* Botones por instructor */}
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button onClick={() => generarMensajeWA(instr)} style={{
                      flex: 1, padding: "9px 0", background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)",
                      borderRadius: 9, color: "#25D366", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                    }}>
                      <span>📲</span> WhatsApp
                    </button>
                    <button onClick={() => exportarTarjeta(instr.id)} style={{
                      flex: 1, padding: "9px 0", background: "rgba(10,132,255,0.1)", border: "1px solid rgba(10,132,255,0.25)",
                      borderRadius: 9, color: "#0A84FF", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                    }}>
                      <span>🖼️</span> Tarjeta
                    </button>
                    <button onClick={() => copiarResumenTexto(instr)} style={{
                      padding: "9px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 9, color: "rgba(240,237,232,0.5)", fontSize: 12, cursor: "pointer"
                    }}>📋</button>
                  </div>
                </div>
              );
            })}

            <div style={{ background: "linear-gradient(135deg,#4A6FE318,#0F3460)", border: "1px solid #4A6FE333", borderRadius: 14, padding: 14, marginTop: 4, marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: "#0A84FF", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Total a pagar</div>
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1.5, background: "linear-gradient(135deg,#0A84FF,#40A9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>${totalGlobal.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "rgba(240,237,232,0.35)", marginTop: 3 }}>{instructores.length} instructores · {Object.values(clases).length} clases</div>
            </div>

            {/* Botón PDF firmas */}
            <button onClick={() => generarPDFFirmas(instructores.map(i => i.nombre), semanaLabel)} style={{
              width: "100%", padding: 13, background: "rgba(0,96,223,0.2)", border: "1px solid rgba(10,132,255,0.4)",
              borderRadius: 10, color: "#0A84FF", fontSize: 13, fontWeight: 700, cursor: "pointer",
              marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}>
              🖼️ Hoja de firmas (imagen)
            </button>

            {!confirmReset ? (
              <button onClick={() => setConfirmReset(true)} style={{ width: "100%", padding: 13, background: "rgba(10,132,255,0.1)", border: "1px solid rgba(10,132,255,0.3)", borderRadius: 10, color: "#0A84FF", fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>
                ✅ Cerrar semana y guardar en historial
              </button>
            ) : (
              <div style={{ background: "rgba(10,132,255,0.1)", border: "1px solid #4A6FE333", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ fontSize: 12, marginBottom: 10, color: "rgba(240,237,232,0.7)" }}>¿Cerrar esta semana y moverla al historial?</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={cerrarSemana} style={{ flex: 1, padding: 10, background: "#0A84FF", border: "none", borderRadius: 8, color: "#000000", fontWeight: 700, cursor: "pointer" }}>Sí, cerrar semana</button>
                  <button onClick={() => setConfirmReset(false)} style={{ flex: 1, padding: 10, background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, color: "rgba(240,237,232,0.5)", cursor: "pointer" }}>Cancelar</button>
                </div>
              </div>
            )}

            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "rgba(240,237,232,0.3)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Reglas de pago</div>
              {[
                { l: "1–14 asistentes", p: "$250", c: "rgba(240,237,232,0.6)" },
                { l: "15–16 asistentes (bono)", p: "$300", c: "#0A84FF", n: "$250 + $50" },
                { l: "0 asistentes", p: "$100", c: "#FF453A" },
              ].map(r => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 11, color: "rgba(240,237,232,0.45)" }}>{r.l}</span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: r.c }}>{r.p}</span>
                    {r.n && <div style={{ fontSize: 9, color: "rgba(240,237,232,0.25)" }}>{r.n}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════ HISTORIAL ══════════ */}
        {vista === "historial" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(240,237,232,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>Historial de pagos</div>
              <div style={{ fontSize: 11, color: "rgba(240,237,232,0.3)" }}>{historial.length} semanas</div>
            </div>

            {historial.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(240,237,232,0.25)", fontSize: 13 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🗂️</div>
                Aún no hay semanas cerradas.<br />Cuando cierres una semana aparecerá aquí.
              </div>
            )}

            {historial.map(h => (
              <div key={h.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${h.pagado ? "#4A6FE333" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Semana {h.semana}</div>
                    <div style={{ fontSize: 10, color: "rgba(240,237,232,0.35)", marginTop: 2 }}>Cerrada el {h.fecha}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: h.pagado ? "#0A84FF" : "#FFD60A" }}>${h.total.toLocaleString()}</div>
                    <div style={{ fontSize: 9, marginTop: 2, color: h.pagado ? "#0A84FF" : "#FFD60A", fontWeight: 600 }}>{h.pagado ? "✅ PAGADO" : "⏳ PENDIENTE"}</div>
                  </div>
                </div>

                {h.instructores.map(i => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: i.color }} />
                      <span style={{ fontSize: 12 }}>{i.nombre}</span>
                      <span style={{ fontSize: 10, color: "rgba(240,237,232,0.35)" }}>{i.clasesDadas} clases</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: i.color }}>${i.total.toLocaleString()}</div>
                      {i.bono > 0 && <div style={{ fontSize: 9, color: "#0A84FF" }}>+${i.bono} bono</div>}
                    </div>
                  </div>
                ))}

                {/* WhatsApp desde historial */}
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => togglePagado(h.id)} style={{
                    flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${h.pagado ? "rgba(255,69,58,0.3)" : "rgba(10,132,255,0.3)"}`,
                    background: h.pagado ? "rgba(255,69,58,0.08)" : "rgba(10,132,255,0.08)",
                    color: h.pagado ? "#FF453A" : "#0A84FF", fontSize: 12, fontWeight: 600, cursor: "pointer"
                  }}>
                    {h.pagado ? "↩️ Pendiente" : "✅ Pagado"}
                  </button>
                  <button onClick={() => {
                    const lineas = h.instructores.map(i =>
                      `• ${i.nombre}: ${i.clasesDadas} clases → $${i.total.toLocaleString()}${i.bono > 0 ? ` (incl. $${i.bono} bono)` : ""}`
                    ).join("\n");
                    const msg = `Resumen semana ${h.semana}:\n\n${lineas}\n\n*Total pagado: $${h.total.toLocaleString()}*`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                  }} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(37,211,102,0.3)", background: "rgba(37,211,102,0.08)", color: "#25D366", fontSize: 12, cursor: "pointer" }}>📲</button>
                  <button onClick={() => generarPDFFirmas(h.instructores.map(i => i.nombre), h.semana)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(10,132,255,0.3)", background: "rgba(10,132,255,0.08)", color: "#0A84FF", fontSize: 12, cursor: "pointer" }}>🖨️</button>
                  <button onClick={() => borrarHistorial(h.id)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(240,237,232,0.3)", fontSize: 12, cursor: "pointer" }}>🗑️</button>
                </div>
              </div>
            ))}

            {historial.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 14, marginTop: 6 }}>
                <div style={{ fontSize: 10, color: "rgba(240,237,232,0.3)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Totales históricos</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { l: "Total pagado", v: `$${historial.filter(h => h.pagado).reduce((a, h) => a + h.total, 0).toLocaleString()}`, c: "#0A84FF" },
                    { l: "Pendiente", v: `$${historial.filter(h => !h.pagado).reduce((a, h) => a + h.total, 0).toLocaleString()}`, c: "#FFD60A" },
                  ].map(s => (
                    <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: 17, fontWeight: 900, color: s.c }}>{s.v}</div>
                      <div style={{ fontSize: 9, color: "rgba(240,237,232,0.3)", marginTop: 3 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ══════════ MODAL TARJETA EXPORTABLE ══════════ */}
      {modalExport !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
          <div style={{ background: "#111118", borderRadius: "20px 20px 0 0", padding: 20, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>
                {modalExport === "all" ? "Resumen general" : instructores.find(i => i.id === modalExport)?.nombre}
              </div>
              <button onClick={() => setModalExport(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(240,237,232,0.4)", fontSize: 20 }}>✕</button>
            </div>

            {/* Tarjeta renderizada */}
            <TarjetaResumen instrId={modalExport} />

            {/* Instrucciones para guardar */}
            <div style={{ marginTop: 14, padding: 12, background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: "rgba(240,237,232,0.5)", lineHeight: 1.6 }}>
                📱 <strong style={{ color: "#F0EDE8" }}>Para guardar como imagen:</strong><br />
                Mantén presionada la tarjeta de arriba → "Guardar imagen" o haz una captura de pantalla de este recuadro.
              </div>
            </div>

            {/* Botones acción */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {modalExport !== "all" && (() => {
                const instr = instructores.find(i => i.id === modalExport);
                return instr ? (
                  <button onClick={() => { generarMensajeWA(instr); setModalExport(null); }} style={{
                    flex: 1, padding: 13, background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)",
                    borderRadius: 10, color: "#25D366", fontWeight: 700, fontSize: 13, cursor: "pointer"
                  }}>📲 Enviar por WhatsApp</button>
                ) : null;
              })()}
              {modalExport !== "all" && (() => {
                const instr = instructores.find(i => i.id === modalExport);
                return instr ? (
                  <button onClick={() => { copiarResumenTexto(instr); }} style={{
                    padding: "13px 16px", background: "rgba(255,255,255,0.07)", border: "none",
                    borderRadius: 10, color: "rgba(240,237,232,0.6)", fontSize: 13, cursor: "pointer"
                  }}>📋</button>
                ) : null;
              })()}
              <button onClick={() => setModalExport(null)} style={{
                flex: modalExport === "all" ? 1 : 0, padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "none",
                borderRadius: 10, color: "rgba(240,237,232,0.4)", cursor: "pointer", fontSize: 13
              }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ MODAL HOJA DE FIRMAS ══════════ */}
      {(modalFirmas || firmasLoading) && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:400, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"16px" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setModalFirmas(null); setFirmasLoading(false); } }}>

          {/* Header modal */}
          <div style={{ width:"100%", maxWidth:600, display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:"#F0EDE8" }}>Hoja de Firmas</div>
              <div style={{ fontSize:11, color:"rgba(240,237,232,0.4)", marginTop:2 }}>
                {firmasLoading ? "Generando imagen..." : "Mantén presionado para guardar · Click derecho en PC"}
              </div>
            </div>
            <button onClick={() => { setModalFirmas(null); setFirmasLoading(false); }}
              style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", color:"#F0EDE8", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>

          {/* Imagen o spinner */}
          <div style={{ width:"100%", maxWidth:600, background:"rgba(18,18,28,0.98)", borderRadius:14, overflow:"hidden", border:"1px solid rgba(10,132,255,0.25)" }}>
            {firmasLoading ? (
              <div style={{ height:300, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
                <div style={{ width:40, height:40, border:"3px solid rgba(10,132,255,0.2)", borderTop:"3px solid #4A6FE3", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
                <div style={{ fontSize:13, color:"rgba(240,237,232,0.5)" }}>Generando imagen...</div>
                <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
              </div>
            ) : modalFirmas && (
              <img
                src={modalFirmas.dataURL}
                alt="Hoja de firmas"
                style={{ width:"100%", display:"block", borderRadius:14 }}
                onContextMenu={(e) => e.stopPropagation()}
              />
            )}
          </div>

          {/* Botones acción */}
          {modalFirmas && (
            <div style={{ width:"100%", maxWidth:600, display:"flex", gap:10, marginTop:12 }}>
              <a href={modalFirmas.dataURL} download={modalFirmas.fileName} style={{
                flex:1, padding:"13px 0", background:"#0A84FF", borderRadius:10,
                color:"#fff", fontWeight:700, fontSize:13, textAlign:"center", textDecoration:"none",
                display:"flex", alignItems:"center", justifyContent:"center", gap:6
              }}>⬇️ Descargar imagen</a>
              <button onClick={() => {
                // Share nativo (Android/algunos iOS)
                if (navigator.share) {
                  fetch(modalFirmas.dataURL)
                    .then(r => r.blob())
                    .then(blob => {
                      const file = new File([blob], modalFirmas.fileName, { type:"image/png" });
                      if (navigator.canShare && navigator.canShare({ files:[file] })) {
                        navigator.share({ files:[file], title:"Hoja de firmas Tempo Studio" })
                          .then(() => toast("¡Compartido! ✓"))
                          .catch(() => {});
                        return;
                      }
                    });
                }
                toast("Mantén presionada la imagen para guardar");
              }} style={{
                padding:"13px 16px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)",
                borderRadius:10, color:"#25D366", fontWeight:700, fontSize:13, cursor:"pointer"
              }}>📲 Compartir</button>
              <button onClick={() => { setModalFirmas(null); setFirmasLoading(false); }} style={{
                padding:"13px 16px", background:"rgba(255,255,255,0.07)", border:"none",
                borderRadius:10, color:"rgba(240,237,232,0.4)", cursor:"pointer"
              }}>✕</button>
            </div>
          )}

          {/* Hint iOS */}
          {modalFirmas && (
            <div style={{ marginTop:10, fontSize:11, color:"rgba(240,237,232,0.3)", textAlign:"center" }}>
              📱 iPhone: mantén presionada la imagen → "Añadir a Fotos" o "Guardar imagen"
            </div>
          )}
        </div>
      )}

      {/* ══════════ MODAL AGREGAR CLASE ══════════ */}
      {modalClase && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#111118", borderRadius: "20px 20px 0 0", padding: 22, width: "100%", maxWidth: 540, margin: "0 auto" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{modalClase.editKey ? "Editar clase" : `Agregar clase – ${modalClase.dia}`}</div>
            <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginBottom: 18 }}>Asistentes (0–{CAPACIDAD})</div>
            <input type="range" min={0} max={CAPACIDAD} value={asistInput || 0} onChange={e => setAsistInput(e.target.value)} style={{ width: "100%", accentColor: "#0A84FF", marginBottom: 4 }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(240,237,232,0.25)", marginBottom: 16 }}><span>0</span><span>8</span><span>16</span></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
              <button onClick={() => setAsistInput(String(Math.max(0, (parseInt(asistInput) || 0) - 1)))} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "none", cursor: "pointer", fontSize: 20, color: "#fff" }}>−</button>
              <input value={asistInput} onChange={e => setAsistInput(e.target.value)} type="number" min={0} max={CAPACIDAD}
                style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#fff", fontSize: 28, fontWeight: 800, padding: "10px 0", outline: "none" }} />
              <button onClick={() => setAsistInput(String(Math.min(CAPACIDAD, (parseInt(asistInput) || 0) + 1)))} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "none", cursor: "pointer", fontSize: 20, color: "#fff" }}>+</button>
            </div>
            {asistInput !== "" && (() => {
              const v = parseInt(asistInput);
              if (!isNaN(v) && v >= 0 && v <= CAPACIDAD) {
                const p = calcularPago(v);
                return (
                  <div style={{ background: p.tipo === "lleno" ? "#4A6FE322" : p.tipo === "vacio" ? "#FF453A18" : "rgba(255,255,255,0.05)", borderRadius: 10, padding: 10, marginBottom: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "rgba(240,237,232,0.4)", marginBottom: 3 }}>
                      {p.tipo === "lleno" ? "🎉 ¡Clase llena! Bono aplicado" : p.tipo === "vacio" ? "⚠️ Clase sin asistentes" : "Clase normal"}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: p.tipo === "lleno" ? "#0A84FF" : p.tipo === "vacio" ? "#FF453A" : "#F0EDE8" }}>${p.total}</div>
                    {p.bono > 0 && <div style={{ fontSize: 10, color: "#0A84FF" }}>$250 base + $50 bono</div>}
                  </div>
                );
              }
            })()}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={guardarClase} style={{ flex: 1, padding: 13, background: "#0A84FF", border: "none", borderRadius: 10, color: "#000000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{modalClase.editKey ? "Guardar" : "Agregar clase"}</button>
              {modalClase.editKey && <button onClick={() => eliminarClase(modalClase.editKey)} style={{ padding: "13px 16px", background: "rgba(255,69,58,0.15)", border: "1px solid rgba(255,69,58,0.3)", borderRadius: 10, color: "#FF453A", cursor: "pointer" }}>🗑️</button>}
              <button onClick={() => setModalClase(null)} style={{ padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, color: "rgba(240,237,232,0.4)", cursor: "pointer" }}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ MODAL EDITAR TELÉFONO ══════════ */}
      {editTelModal !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 250, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#111118", borderRadius: "20px 20px 0 0", padding: 22, width: "100%", maxWidth: 540, margin: "0 auto" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
              📱 Teléfono WhatsApp
            </div>
            <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginBottom: 16, lineHeight: 1.6 }}>
              Ingresa el número con código de país para que el botón de WhatsApp abra directo el chat.<br/>
              <span style={{ color: "#0A84FF" }}>México: 52 + 10 dígitos → 5215512345678</span>
            </div>
            <input
              value={tmpTel}
              onChange={e => setTmpTel(e.target.value)}
              type="tel"
              placeholder="Ej: 5215512345678"
              autoFocus
              style={{ width: "100%", padding: "12px 13px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#fff", fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 14, letterSpacing: 1 }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => {
                setInstructores(prev => prev.map(i => i.id === editTelModal ? { ...i, telefono: tmpTel.trim() } : i));
                setEditTelModal(null);
              }} style={{ flex: 1, padding: 13, background: "#0A84FF", border: "none", borderRadius: 10, color: "#000000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Guardar</button>
              {tmpTel && <button onClick={() => {
                setInstructores(prev => prev.map(i => i.id === editTelModal ? { ...i, telefono: "" } : i));
                setEditTelModal(null);
              }} style={{ padding: "13px 14px", background: "rgba(255,69,58,0.12)", border: "1px solid rgba(255,69,58,0.3)", borderRadius: 10, color: "#FF453A", cursor: "pointer", fontSize: 13 }}>Borrar</button>}
              <button onClick={() => setEditTelModal(null)} style={{ padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, color: "rgba(240,237,232,0.4)", cursor: "pointer" }}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ MODAL AGREGAR INSTRUCTOR ══════════ */}
      {showAddInstr && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#111118", borderRadius: "20px 20px 0 0", padding: 22, width: "100%", maxWidth: 540, margin: "0 auto" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Nuevo instructor</div>
            <input value={newInstrName} onChange={e => setNewInstrName(e.target.value)} placeholder="Nombre" autoFocus
              style={{ width: "100%", padding: "11px 13px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
            <div style={{ fontSize: 10, color: "rgba(240,237,232,0.35)", marginBottom: 5, letterSpacing: 1 }}>TELÉFONO WHATSAPP (con código de país)</div>
            <input value={newInstrTel} onChange={e => setNewInstrTel(e.target.value)} placeholder="Ej: 5215512345678"
              type="tel"
              style={{ width: "100%", padding: "11px 13px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12 }} />
            <div style={{ fontSize: 10, color: "rgba(240,237,232,0.25)", marginBottom: 14, lineHeight: 1.5 }}>
              México: 52 + 10 dígitos. Ej: 5215512345678
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={addInstructor} style={{ flex: 1, padding: 12, background: "#0A84FF", border: "none", borderRadius: 10, color: "#000000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Agregar</button>
              <button onClick={() => setShowAddInstr(false)} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, color: "rgba(240,237,232,0.4)", cursor: "pointer" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
