module.exports = async (req, res) => {
    if (req.method === 'GET') {
      try {
        const apiKey = process.env.VITE_HG_API_KEY;
  
        const response = await fetch(`https://api.hgbrasil.com/finance?key=${apiKey}`);
        const data = await response.json();
  
        res.status(200).json(data); 
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados financeiros' });
      }
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
  };
  