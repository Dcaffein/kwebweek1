const { ArticleDAO } = require("../../DAO");

const readArticle = async (req, res, next) => {
    try {
        const { user } = req.session;
        const { articleId } = req.params;
        const article = await ArticleDAO.getById(articleId);

        if (!article) throw new Error('NOT_FOUND');
        return res.render('articles/details.pug', { user, article });
    } catch (err) {
        next(err);
    }
}

const writeArticleForm = async (req, res, next) => {
    try {
        const { user } = req.session;
        return res.render('articles/editor.pug', { user });
    } catch (err) {
        next(err);
    }
}

const writeArticle = async (req, res, next) => {
    try {
        const { user } = req.session;
        const title = req.body.title.trim();
        const content = req.body.content.trim();

        if (!title || title.length > 50 || !content || content.length > 65535)
            throw new Error('BAD_REQUEST');

        const newArticleId = await ArticleDAO.create(title, content, user);
        return res.redirect(`/article/${newArticleId}`)

    } catch (err) {
        next(err);
    }
}

const editArticleForm = async (req, res, next) => {
    try {
        const { articleId } = req.params;
        const { user } = req.session;

        const article = await ArticleDAO.getById(articleId);
        if (!article) throw new Error("NOT_EXIST");

        return res.render("articles/editor.pug", { user, article });
    } catch (err) {
        next(err);
    }
}

const editArticle = async (req, res, next) => {
    try {
        const { articleId } = req.params;
        const { user } = req.session;
        const title = req.body.title.trim();
        const content = req.body.content.trim();
        if (!title || !content || title.length > 50 || content.length > 65000) {
            throw new Error("BAD_REQEUST");
        }

        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);
        if (!article) throw new Error("NOT_EXIST");

        await ArticleDAO.update(articleId, title, content);

        return res.redirect(`/article/${articleId}`);
    } catch (err) {
        next(err);
    }
}


const deleteArticle = async (req, res, next) => {
    try {
        const { articleId } = req.params;
        const { user } = req.session;
        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);

        if (!article) throw new Error("NOT_EXIST");

        await ArticleDAO.remove(articleId, user);
        return res.redirect('/articles/page/1');
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    readArticle,
    writeArticleForm,
    writeArticle,
    editArticleForm,
    editArticle,
    deleteArticle,
};