/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable padded-blocks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
/* eslint-disable indent */

const { nanoid } = require("nanoid");
const notes = require("./notes");

// ------------------------------------------   START ADD NOTE
    const addNoteHandler = (request, h) => {
        const { title, tags, body } = request.payload;

        const id = nanoid(16);
        const createdAt = new Date().toString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };

        notes.push(newNote);

        const isSuccess = notes.filter((note) => note.id === id).length > 0;

        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId: id,
                }
            })
            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;

    };
// END INI ADD NOTE

// ------------------------------------------    START GET All NOTE
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});
// END INI GET All NOTE

// ------------------------------------------    START Get ID (param) NOTE 
    const getNoteByIdHandler = (request, h) => {
        const { id } = request.params;
        const note = notes.filter((n) => n.id === id)[0];
        if (note !== undefined) {
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        }

        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        });
        response.code(404);
        return response;
    };

// END INI Get ID (param) NOTE

//  -----------------------------------------    Start Update (param) NOTE     
    const editNoteByIdHandler = (request, h) => {
        const { id } = request.params;
        const { title, tags, body } = request.payload;
        const updatedAt = new Date().toString();

        const index = notes.findIndex((note) => note.id === id);

        if (index !== -1) {
            notes[index] = {
                ...notes[index],
                title,
                tags,
                body,
                updatedAt,
            };
            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil diperbarui',
                data: {
                    notes,
                }
            })
            response.code(200);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui catatan. Id tidak ditemukan',
            data: {
                notes,
            }
        })
        response.code(404);
        return response;
    }
// END INI Update (param) NOTE

//  -----------------------------------------    Start DELETE (param) NOTE    
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}
// END INI DELETE (param) NOTE

// eslint-disable-next-line eol-last
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };