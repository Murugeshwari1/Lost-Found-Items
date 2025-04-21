import express, { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

// GET all lost items
router.get('/', (req: Request, res: Response) => {
  db.query('SELECT * FROM lost_items', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// GET a single lost item by ID
router.get('/:id', (req: Request, res: Response) => {
  const itemId = req.params.id;
  db.query('SELECT * FROM lost_items WHERE id = ?', [itemId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching item' });
    const rows = results as RowDataPacket[];
    if (rows.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json(rows[0]);
  });
});

// POST new lost item with duplicate check
router.post('/', (req: Request, res: Response) => {
  const { item_name, category, description, last_seen_location, date_lost, contact_info } = req.body;

  const checkQuery = `
    SELECT * FROM lost_items
    WHERE item_name = ? AND category = ? AND last_seen_location = ? AND date_lost = ?
  `;

  db.query(checkQuery, [item_name, category, last_seen_location, date_lost], (checkErr, checkResults) => {
    if (checkErr) return res.status(500).json({ error: 'Duplicate check failed' });

    if ((checkResults as RowDataPacket[]).length > 0) {
      return res.status(409).json({ error: 'Duplicate lost item' });
    }

    const insertQuery = `
      INSERT INTO lost_items (item_name, category, description, last_seen_location, date_lost, contact_info)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [item_name, category, description, last_seen_location, date_lost, contact_info], (insertErr, result) => {
      if (insertErr) return res.status(500).json({ error: 'Insert failed' });

      const insertResult = result as ResultSetHeader;
      res.status(201).json({ message: 'Lost item added', id: insertResult.insertId });
    });
  });
});

// PUT (Edit) a lost item by ID
router.put('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const { item_name, category, description, last_seen_location, date_lost, contact_info } = req.body;

  const updateQuery = `
    UPDATE lost_items
    SET item_name = ?, category = ?, description = ?, last_seen_location = ?, date_lost = ?, contact_info = ?
    WHERE id = ?
  `;

  db.query(updateQuery, [item_name, category, description, last_seen_location, date_lost, contact_info, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });

    const updateResult = result as ResultSetHeader;
    if (updateResult.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Lost item updated successfully' });
  });
});

// DELETE a lost item by ID
router.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  db.query('DELETE FROM lost_items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });

    const deleteResult = result as ResultSetHeader;
    if (deleteResult.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json({ message: 'Item deleted successfully' });
  });
});

export default router;
