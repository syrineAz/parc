function logout (req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //Pas de contenu
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie effacé' });
}
