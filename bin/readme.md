## Pre-commit Hook

Make `pre-commit` executable:

```bash
chmod +x build/pre-commit
```

Symlink to `pre-commit` from your project's `.git/hooks/pre-commit`:

```bash
cd .git/hooks && ln -s ../../build/pre-commit . && cd -
```