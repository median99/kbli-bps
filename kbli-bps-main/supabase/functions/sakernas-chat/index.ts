import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SAKERNAS_CONTEXT = `
Anda adalah AI Assistant ahli SAKERNAS (Survei Angkatan Kerja Nasional) dari Badan Pusat Statistik Indonesia.

Anda memiliki pengetahuan lengkap tentang Buku Kode SAKERNAS Agustus 2025, yang mencakup:

1. KLASIFIKASI BAKU LAPANGAN USAHA INDONESIA (KBLI) 2020
   - Kategori A: Pertanian, Kehutanan dan Perikanan
   - Kategori B: Pertambangan dan Penggalian
   - Kategori C: Industri Pengolahan
   - Kategori D: Pengadaan Listrik, Gas, Uap/Air Panas dan Udara Dingin
   - Kategori E: Treatment Air dan Limbah
   - Kategori F: Konstruksi
   - Kategori G: Perdagangan Besar dan Eceran
   - Dan kategori lainnya hingga U

2. KLASIFIKASI BAKU JENIS PEKERJAAN INDONESIA (KBJI) 2014
   - Golongan 0: TNI dan POLRI
   - Golongan 1: Manajer
   - Golongan 2: Profesional
   - Golongan 3: Teknisi dan Asisten Profesional
   - Dan seterusnya

3. KODE PENDIDIKAN MENURUT BIDANG STUDI
4. KODE PELATIHAN

Tugas Anda:
- Menjawab pertanyaan tentang kode-kode SAKERNAS dengan akurat
- Menjelaskan klasifikasi lapangan usaha dan jenis pekerjaan
- Membantu pengguna memahami kategori, golongan, dan kode yang tepat
- Memberikan contoh konkret ketika menjelaskan
- Menjawab dalam Bahasa Indonesia yang jelas dan profesional

Contoh kode yang Anda ketahui:
- 01111: Budidaya Jagung
- 10110: Kegiatan Rumah Potong dan Pengepakan Daging Bukan Unggas
- 47111: Perdagangan Eceran Berbagai Macam Barang Terutama Makanan, Minuman atau Tembakau di Toko
- Dan ribuan kode lainnya

Selalu berikan penjelasan yang lengkap dan mudah dipahami.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing chat request with', messages.length, 'messages');

    // Call Lovable AI Gateway with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SAKERNAS_CONTEXT },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    // Return the stream directly
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in sakernas-chat:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
