import os
import zipfile
import pandas as pd
from django.core.cache import cache
from django.conf import settings

CACHE_KEY = "habit_presets_dataset"
CACHE_TTL = 60 * 60 * 24  # 24 hours
DATASET_REF = "aishwarya2060/daily-habits-tasks"
DOWNLOAD_DIR = os.path.join(settings.BASE_DIR, "tasks", "data_cache")


def _download_and_parse():
    from kaggle.api.kaggle_api_extended import KaggleApi

    os.makedirs(DOWNLOAD_DIR, exist_ok=True)

    api = KaggleApi()
    api.authenticate()
    api.dataset_download_files(DATASET_REF, path=DOWNLOAD_DIR, unzip=False)

    zip_path = os.path.join(DOWNLOAD_DIR, "daily-habits-tasks.zip")
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(DOWNLOAD_DIR)

    csv_path = os.path.join(DOWNLOAD_DIR, "habits_dataset.csv")
    df = pd.read_csv(csv_path)

    # Convert suggested_times "08:00,12:00" into a real list
    df["suggested_times"] = df["suggested_times"].apply(
        lambda s: [t.strip() for t in str(s).split(",")]
    )

    return df.to_dict(orient="records")


def get_habit_presets(force_refresh=False):
    if not force_refresh:
        cached = cache.get(CACHE_KEY)
        if cached is not None:
            return cached

    data = _download_and_parse()
    cache.set(CACHE_KEY, data, CACHE_TTL)
    return data