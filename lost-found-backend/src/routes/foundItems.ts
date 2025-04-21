import express, { Request, Response } from 'express';
import db from '../db';

const router = express.Router();

// GET all found items
router.get('/', (req: Request, res: Response) => {
  db.query('SELECT * FROM found_items', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// POST a new found item with duplicate check
router.post('/', (req: Request, res: Response) => {
  const { item_name, category, description, found_location, date_found, contact_info } = req.body;

  const checkQuery = `
    SELECT * FROM found_items
    WHERE item_name = ? AND category = ? AND found_location = ? AND date_found = ?
  `;

  db.query(checkQuery, [item_name, category, found_location, date_found], (checkErr, checkResults) => {
    if (checkErr) return res.status(500).json({ error: 'Duplicate check failed' });

    if ((checkResults as any[]).length > 0) {
      return res.status(409).json({ error: 'Duplicate found item' });
    }

    const insertQuery = `
      INSERT INTO found_items (item_name, category, description, found_location, date_found, contact_info)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [item_name, category, description, found_location, date_found, contact_info], (insertErr, result) => {
      if (insertErr) return res.status(500).json({ error: 'Insert failed' });
      res.status(201).json({ message: 'Found item added', id: (result as any).insertId });
    });
  });
});

// DELETE a found item by ID
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  db.query('DELETE FROM found_items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete error' });
    res.json({ message: 'Found item deleted' });
  });
});

// PUT (Edit) a found item by ID
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { item_name, category, description, found_location, date_found, contact_info } = req.body;

  const updateQuery = `
    UPDATE found_items
    SET item_name = ?, category = ?, description = ?, found_location = ?, date_found = ?, contact_info = ?
    WHERE id = ?
  `;

  db.query(updateQuery, [item_name, category, description, found_location, date_found, contact_info, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Found item updated' });
  });
});

export default router;
